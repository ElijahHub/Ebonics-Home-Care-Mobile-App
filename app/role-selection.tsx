import { supabase } from "@/libs/supabase";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { Heart, Stethoscope } from "lucide-react-native";
import { useState } from "react";
import { Button, Card, ScrollView, Text, YStack } from "tamagui";

type Role = "client" | "caregiver";

export default function RoleSelectionScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [error, setError] = useState(false);

  const handleRolesSelection = async (selectedRole: Role) => {
    if (!userId) {
      console.error("Error: User ID is missing from URL query.");
      router.push("/auth/login");
      return;
    }

    try {
      if (selectedRole === "client") {
        router.push("/client");
        return;
      }

      const { error } = await supabase.rpc("swap_user_role", {
        target_user_id: userId,
        old_role: "client", // The default role we want to remove
        new_role: selectedRole, // The new role to assign
      });

      if (error) {
        console.error("RPC Error: Failed to swap user role.", error);
        setError(true);
        return;
      }

      //TODO: Redirect to caregiver onboarding flow
      router.push("/auth/login");
    } catch (error) {
      console.error(
        "An unexpected error occurred during role selection:",
        error
      );
      setError(true);
    } finally {
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <ScrollView
      flex={1}
      backgroundColor="$background"
      contentContainerStyle={{
        paddingTop: 80,
        paddingHorizontal: 24,
        paddingBottom: 40,
      }}
    >
      <YStack alignItems="center" marginBottom="$8">
        <Text
          fontSize={26}
          fontWeight="700"
          color="$color12"
          textAlign="center"
          lineHeight={32}
        >
          Let&apos;s get started. What describes you best?
        </Text>
      </YStack>

      {error && (
        <YStack
          marginBottom="$4"
          padding="$3"
          backgroundColor="$red10"
          borderRadius="$4"
        >
          <Text color="$red12" fontWeight="600" textAlign="center">
            An error occurred while updating your role. Please try again.
          </Text>
        </YStack>
      )}

      <YStack space="$6">
        {/* ========= CARD 1 ========= */}
        <Card
          bordered
          size="$4"
          backgroundColor="$background"
          borderRadius="$6"
          padding="$5"
          pressStyle={{ scale: 0.98 }}
          onPress={() => handleRolesSelection("client")}
        >
          <Card.Header alignItems="center">
            <Heart size={50} color="#1e40af" />

            <Text
              fontSize={20}
              fontWeight="700"
              marginTop="$4"
              color="$color12"
            >
              I need a caregiver.
            </Text>

            <Text
              fontSize={14}
              color="$color10"
              textAlign="center"
              marginTop="$2"
              lineHeight={20}
            >
              Start finding the best caregivers for you or your loved ones.
            </Text>
          </Card.Header>

          <Card.Footer marginTop="$4">
            <Button backgroundColor="#1e40af" borderRadius="$4" width="100%">
              <Text fontSize={16} fontWeight="600" color="white">
                Find Care
              </Text>
            </Button>
          </Card.Footer>
        </Card>

        {/* ========= CARD 2 ========= */}
        <Card
          bordered
          size="$4"
          backgroundColor="$background"
          borderRadius="$6"
          padding="$5"
          pressStyle={{ scale: 0.98 }}
          onPress={() => handleRolesSelection("caregiver")}
        >
          <Card.Header alignItems="center">
            <Stethoscope size={50} color="#1e40af" />

            <Text
              fontSize={20}
              fontWeight="700"
              marginTop="$4"
              color="$color12"
            >
              I want a care job.
            </Text>

            <Text
              fontSize={14}
              color="$color10"
              textAlign="center"
              marginTop="$2"
              lineHeight={20}
            >
              Create a profile and find care jobs.
            </Text>
          </Card.Header>

          <Card.Footer marginTop="$4">
            <Button backgroundColor="#1e40af" borderRadius="$4" width="100%">
              <Text fontSize={16} fontWeight="600" color="white">
                Find Jobs
              </Text>
            </Button>
          </Card.Footer>
        </Card>
      </YStack>
    </ScrollView>
  );
}
