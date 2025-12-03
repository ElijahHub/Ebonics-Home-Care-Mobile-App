import ActionCard from "@/components/action-card";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import {
  Bell,
  ClipboardList,
  FilePlus,
  LogOut,
  MessageCircle,
  Users,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, XStack, YStack } from "tamagui";

export default function HomeScreen() {
  const router = useRouter();
  const { signOut } = useAuthStore();

  const [notificationCount] = useState(3);

  const logOut = async () => {
    await signOut();
    router.push("/auth/login");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
        <YStack padding="$5" gap="$4">
          {/* HEADER */}
          <XStack
            justifyContent="space-between"
            alignItems="center"
            paddingTop="$5"
          >
            <YStack>
              <Text fontSize="$8" fontWeight="700" color="$gray800">
                Welcome, Emma!
              </Text>
              <Text fontSize="$2" color="$gray500" marginTop="$1">
                Your care dashboard
              </Text>
            </YStack>

            <TouchableOpacity onPress={() => logOut()}>
              <LogOut size={26} color="#6B7280" />
            </TouchableOpacity>
          </XStack>

          {/* QUICK ACTIONS */}
          <YStack gap="$2" marginTop="$4">
            <Text
              fontSize="$2"
              fontWeight="700"
              color="$gray600"
              textTransform="uppercase"
            >
              Quick Actions
            </Text>

            <ActionCard
              icon={
                <View style={styles.iconBlue}>
                  <FilePlus size={28} color="#2563EB" />
                </View>
              }
              title="New Care Request"
              subtitle="Schedule a visit"
              onPress={() => router.push("/client")}
            />

            <ActionCard
              icon={
                <View style={styles.iconPurple}>
                  <ClipboardList size={28} color="#4F46E5" />
                </View>
              }
              title="View Requests"
              subtitle="Track your submitted requests"
              onPress={() => router.push("/client")}
            />

            <ActionCard
              icon={
                <View style={styles.iconGreen}>
                  <Users size={28} color="#059669" />
                </View>
              }
              title="View Caregivers"
              subtitle="See assigned caregivers"
              onPress={() => router.push("/client")}
            />

            <ActionCard
              icon={
                <View style={styles.iconOrange}>
                  <Bell size={28} color="#EA580C" />
                  {notificationCount > 0 && (
                    <View style={styles.notifBadge}>
                      <Text fontSize="$2" fontWeight="700" color="white">
                        {notificationCount}
                      </Text>
                    </View>
                  )}
                </View>
              }
              title="View Alerts"
              subtitle={
                notificationCount > 0
                  ? `${notificationCount} new notification${
                      notificationCount > 1 ? "s" : ""
                    }`
                  : "No new alerts"
              }
              onPress={() => router.push("/client/message")}
            />
          </YStack>

          {/* INSTRUCTIONS SECTION */}
          <YStack gap="$3" marginTop="$6" marginBottom="$10">
            <Text fontSize="$4" fontWeight="700" color="$gray700">
              Helpful Tips
            </Text>

            <Text fontSize="$3" color="$gray500" lineHeight={20}>
              • You can request a caregiver at any time using the “New Care
              Request” button.{"\n\n"}• Tap “View Caregivers” to check who is
              assigned to support you.{"\n\n"}• Notifications will alert you
              about schedule changes, approvals, and new messages.{"\n\n"}• Use
              the chat bubble to quickly connect with support or get automated
              help from our care assistant.
            </Text>
          </YStack>
        </YStack>
      </ScrollView>

      {/* FLOATING CHATBOT BUBBLE */}
      <TouchableOpacity
        style={styles.chatBubble}
        activeOpacity={0.9}
        onPress={() => router.push("/client/message")}
      >
        <MessageCircle size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  /* ICON COLORS */
  iconBlue: {
    backgroundColor: "#EFF6FF",
    padding: 12,
    borderRadius: 12,
  },
  iconPurple: {
    backgroundColor: "#EEF2FF",
    padding: 12,
    borderRadius: 12,
  },
  iconGreen: {
    backgroundColor: "#ECFDF5",
    padding: 12,
    borderRadius: 12,
  },
  iconOrange: {
    backgroundColor: "#FFF7ED",
    padding: 12,
    borderRadius: 12,
    position: "relative",
  },
  notifBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#EF4444",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },

  /* CHAT BUBBLE */
  chatBubble: {
    position: "absolute",
    bottom: 28,
    right: 24,
    backgroundColor: "#2563EB",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
});
