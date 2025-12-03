import { supabase } from "@/libs/supabase";
import { useAuthStore } from "@/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Spinner, Text, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

export default function Index() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [networkState, setNetworkState] = useState<Network.NetworkState>({
    isConnected: true,
    isInternetReachable: true,
  });

  //? Helper function to check if onboarding is completed
  const checkOnboardingCompleted = async () => {
    const value = await AsyncStorage.getItem("onboardingCompleted");
    return value === "true";
  };

  //* Monitor network status
  useEffect(() => {
    const checkNetwork = async () => {
      const state = await Network.getNetworkStateAsync();
      setNetworkState(state);
    };

    checkNetwork();

    const interval = setInterval(checkNetwork, 5000); // check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  //! Alert user if offline
  useEffect(() => {
    if (
      networkState.isConnected === false &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        "🔌 You are offline",
        "You can continue using the app offline."
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  //? Handle redirection based on auth state and onboarding status
  const handleRedirect = useCallback(
    async (session: any) => {
      const onboardingCompleted = await checkOnboardingCompleted();

      if (!onboardingCompleted) {
        router.replace("/onboarding");
        return;
      }

      if (!session?.user) {
        setUser(null);
        router.replace("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!profile) {
        setUser(null);
        router.replace("/auth/login");
        return;
      }

      setUser(profile);

      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      if (rolesError) {
        console.error("Error fetching user roles:", rolesError);
        router.replace("/auth/login");
        return;
      }

      if (!rolesData || rolesData.length === 0) {
        router.replace("/role-selection");
      } else {
        router.replace(`/auth/login`);
      }
    },
    [router, setUser]
  );

  //? Main auth flow handler
  const handleAuthFlow = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    handleRedirect(session);
  }, [handleRedirect]);

  //* Initial load and auth state change listener
  useEffect(() => {
    // initial load
    handleAuthFlow();

    // auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleRedirect(session);
    });

    return () => subscription.unsubscribe();
  }, [handleAuthFlow, handleRedirect]);

  return (
    <LinearGradient
      flex={1}
      colors={["#f7f9ff", "#eef2ff", "#dce3ff"]}
      start={[0, 0]}
      end={[1, 1]}
    >
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$4"
        padding="$4"
      >
        <YStack alignItems="center">
          <Text
            fontSize={44}
            fontWeight="800"
            color="#2f3dbd"
            style={{ letterSpacing: -1 }}
          >
            Ebonics
          </Text>

          <Text fontSize={14} color="#4c5bd4" opacity={0.8} marginTop="$-2">
            Healthcare made simple
          </Text>
        </YStack>

        <Spinner size="large" color="#3b5bfd" />
      </YStack>
    </LinearGradient>
  );
}
