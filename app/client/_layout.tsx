import { useAuthStore } from "@/store/authStore";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { Spinner, Text, YStack } from "tamagui";

export default function RootLayout() {
  const { initializeAuth, isLoading, isAuthenticated } = useAuthStore();

  // Run auth initialization here
  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe(); // cleanup
  }, [initializeAuth]);

  // Loading screen
  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" gap="$3">
        <Spinner size="large" color="$blue10" />
        <Text fontSize="$4" color="$gray600">
          Checking account...
        </Text>
      </YStack>
    );
  }

  // Redirect if user is NOT authenticated
  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  // If logged in → show tabs
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
