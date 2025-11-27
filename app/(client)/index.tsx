import {
  Calendar,
  ChevronRight,
  CreditCard,
  List,
  LogOut,
  User,
  UserPlus,
  Users,
} from "lucide-react-native";
import React from "react";
import { Image, Linking, ScrollView, TouchableOpacity } from "react-native";
import { Button, Card, Circle, Text, XStack, YStack } from "tamagui";

export default function ClientDashboard() {
  // Call
  const handleCall = () => {
    Linking.openURL("tel:+2348000000000");
  };

  // WhatsApp
  const handleWhatsApp = () => {
    const phone = "2348000000000"; // Nigeria format, no +
    Linking.openURL(`https://wa.me/${phone}`);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffff", position: "relative" }}
      showsVerticalScrollIndicator={false}
    >
      <YStack padding="$4" gap="$4" paddingBottom="$10">
        {/* HEADER */}
        <XStack
          alignItems="center"
          justifyContent="space-between"
          paddingTop="$6"
        >
          <XStack alignItems="center" gap="$3">
            <Circle size={55} backgroundColor="#78909C">
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200",
                }}
                style={{ width: 55, height: 55, borderRadius: 35 }}
              />
            </Circle>
            <Text fontSize={22} fontWeight="600" color="#212121">
              Welcome back, Elijah
            </Text>
          </XStack>

          <TouchableOpacity>
            <LogOut size={28} color="#424242" strokeWidth={2} />
          </TouchableOpacity>
        </XStack>

        {/* QUICK STATS CARD */}
        <Card
          backgroundColor="#E3F2FD"
          borderRadius={18}
          padding="$4"
          shadowOffset={{ width: 0, height: 2 }}
        >
          <Text fontSize={20} fontWeight="700" color="#212121">
            Quick Actions
          </Text>

          <XStack justifyContent="space-around" marginTop="$4">
            <YStack alignItems="center" space="$2">
              <Circle size={70} backgroundColor="#F5F5F5">
                <Users size={30} color="#1976D2" />
              </Circle>
              <Text fontSize={15} fontWeight="500">
                Caregiver
              </Text>
            </YStack>

            <YStack alignItems="center" space="$2">
              <Circle size={70} backgroundColor="#F5F5F5">
                <UserPlus size={30} color="#1976D2" />
              </Circle>
              <Text fontSize={15} fontWeight="500">
                Request
              </Text>
            </YStack>

            <YStack alignItems="center" space="$2">
              <Circle size={70} backgroundColor="#F5F5F5">
                <List size={30} color="#1976D2" />
              </Circle>
              <Text fontSize={15} fontWeight="500">
                Status
              </Text>
            </YStack>
          </XStack>
        </Card>

        {/* PROFILE CARD */}
        <Card
          backgroundColor="#E3F2FD"
          borderRadius={20}
          padding="$4"
          pressStyle={{ opacity: 0.8 }}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" space="$3">
              <Circle size={75} backgroundColor="#F5F5F5">
                <User size={34} color="#1976D2" />
              </Circle>
              <YStack>
                <Text fontSize={19} fontWeight="600">
                  Profile
                </Text>
                <Text fontSize={14} color="#757575">
                  View & update your details
                </Text>
              </YStack>
            </XStack>
            <ChevronRight size={24} color="#BDBDBD" />
          </XStack>
        </Card>

        {/* CARE SCHEDULE */}
        <Card
          backgroundColor="#E3F2FD"
          borderRadius={20}
          padding="$4"
          pressStyle={{ opacity: 0.8 }}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" space="$3">
              <Circle size={75} backgroundColor="#F5F5F5">
                <Calendar size={34} color="#1976D2" />
              </Circle>
              <YStack>
                <Text fontSize={19} fontWeight="600">
                  Care Schedule
                </Text>
                <Text fontSize={14} color="#757575">
                  Upcoming caregiver visits
                </Text>
              </YStack>
            </XStack>
            <ChevronRight size={24} color="#BDBDBD" />
          </XStack>
        </Card>

        {/* PAYMENTS */}
        <Card
          backgroundColor="#E3F2FD"
          borderRadius={20}
          padding="$4"
          pressStyle={{ opacity: 0.8 }}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" space="$3">
              <Circle size={75} backgroundColor="#F5F5F5">
                <CreditCard size={34} color="#1976D2" />
              </Circle>
              <YStack>
                <Text fontSize={19} fontWeight="600">
                  Billing & Payments
                </Text>
                <Text fontSize={14} color="#757575">
                  Check invoices and receipts
                </Text>
              </YStack>
            </XStack>
            <ChevronRight size={24} color="#BDBDBD" />
          </XStack>
        </Card>

        {/* EMERGENCY BUTTON */}
        <Button
          backgroundColor="#D32F2F"
          color="white"
          fontSize={18}
          fontWeight="700"
          height={60}
          borderRadius={18}
          pressStyle={{ backgroundColor: "#B71C1C" }}
          marginTop="$2"
        >
          Emergency Support Hotline
        </Button>
      </YStack>
    </ScrollView>
  );
}
