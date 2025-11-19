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

  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const checkOnboardingCompleted = async () => {
    const value = await AsyncStorage.getItem("onboardingCompleted");
    return value === "true";
  };

  useEffect(() => {
    const checkNetwork = async () => {
      const state = await Network.getNetworkStateAsync();
      setNetworkState(state);
    };

    checkNetwork();

    const interval = setInterval(checkNetwork, 5000); // check every 5 seconds
    return () => clearInterval(interval);
  }, []);

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

  const handleRedirect = useCallback(
    async (session: any) => {
      await wait(5000);

      const onboardingCompleted = await checkOnboardingCompleted();

      if (!onboardingCompleted) {
        router.replace("/onboarding");
        return;
      }

      if (!session?.user) {
        setUser(null);
        router.replace("/role-selection");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!profile) {
        setUser(null);
        router.replace("/role-selection");
        return;
      }

      setUser(profile);

      if (!profile.role) {
        router.replace("/role-selection");
      } else {
        router.replace(`/(auth)/login`);
      }
    },
    [router, setUser]
  );

  const handleAuthFlow = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    handleRedirect(session);
  }, [handleRedirect]);

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
