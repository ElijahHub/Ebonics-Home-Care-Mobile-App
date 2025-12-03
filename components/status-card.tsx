import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, XStack, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

type StatusState = "reviewing" | "active" | "no-request";

export default function StatusCard() {
  const [currentStatus] = useState<StatusState>("no-request");

  const statusConfigs: Record<StatusState, any> = {
    reviewing: {
      title: "Care Request Under Review ⏳",
      content:
        "We are currently matching you with a qualified caregiver. Estimated completion: 24 hours.",
      colors: ["#3B82F6", "#1D4ED8"],
    },
    active: {
      title: "Next Visit Scheduled ✅",
      content: "Caregiver Sarah R. is scheduled for Tomorrow at 10:00 AM.",
      colors: ["#10B981", "#059669"],
    },
    "no-request": {
      title: "Ready to Start? 📝",
      content: "Submit your first care request to begin services.",
      colors: ["#F59E0B", "#D97706"],
    },
  };

  const currentConfig = statusConfigs[currentStatus];
  return (
    <>
      {/* STATUS CARD */}
      <LinearGradient
        colors={currentConfig.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statusCard}
      >
        <YStack space="$4">
          <Text fontSize="$6" fontWeight="700" color="white">
            {currentConfig.title}
          </Text>
          <Text fontSize="$4" color="rgba(255,255,255,0.95)">
            {currentConfig.content}
          </Text>
        </YStack>

        <View style={styles.statusFooter}>
          <XStack justifyContent="space-between">
            <Text fontSize="$3" color="rgba(255,255,255,0.8)">
              Status
            </Text>
            <Text fontSize="$3" fontWeight="600" color="white">
              {currentStatus === "no-request" ? "Pending" : currentStatus}
            </Text>
          </XStack>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    borderRadius: 24,
    padding: 32,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  statusFooter: {
    marginTop: 24,
    paddingTop: 24,
    borderTopColor: "rgba(255,255,255,0.2)",
    borderTopWidth: 1,
  },
});
