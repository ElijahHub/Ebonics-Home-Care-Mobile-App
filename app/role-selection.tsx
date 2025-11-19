import { useRouter } from "expo-router";
import { Heart, Stethoscope } from "lucide-react-native";
import { Button, Card, ScrollView, Text, YStack } from "tamagui";

export default function RoleSelectionScreen() {
  const router = useRouter();

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

      <YStack space="$6">
        {/* ========= CARD 1 ========= */}
        <Card
          bordered
          size="$4"
          backgroundColor="$background"
          borderRadius="$6"
          padding="$5"
          pressStyle={{ scale: 0.98 }}
          onPress={() => router.push("/(auth)/login")}
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
          onPress={() => router.push("/(auth)/login")}
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
