import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronRight, Heart, Home, Pill } from "lucide-react-native";
import { useState } from "react";
import Animated, { FadeIn, FadeOut, ZoomIn } from "react-native-reanimated";
import { AnimatePresence, Button, Stack, Text, XStack, YStack } from "tamagui";

const slides = [
  {
    id: 1,
    type: "welcome",
    title: "Welcome to CareHub",
    subtitle:
      "Empowering independence through compassionate, personalized home care",
    icon: Heart,
    color: "#0284C7",
  },
  {
    id: 2,
    type: "mission",
    title: "Our Mission",
    content:
      "We believe everyone deserves quality care in the comfort of their own home. Our team of dedicated professionals is committed to providing compassionate support that enhances independence and improves quality of life.",
    icon: Home,
    color: "#0284C7",
  },
  {
    id: 3,
    type: "service",
    title: "Personal Care",
    content:
      "Assistance with dressing, bathing, grooming, and other dalignItemsly living activities",
    icon: Heart,
    color: "#FF6B6B",
  },
  {
    id: 4,
    type: "service",
    title: "Medication Management",
    content:
      "Organized medication schedules, reminders, and health support to ensure wellness",
    icon: Pill,
    color: "#4ECDC4",
  },
  {
    id: 5,
    type: "service",
    title: "Companionship & Support",
    content:
      "Social engagement, emotional support, and meaningful interactions at home",
    icon: Home,
    color: "#95E1D3",
  },
  {
    id: 6,
    type: "features",
    title: "Why Choose Us",
    features: [
      "Licensed and background-checked caregivers",
      "24/7 support and emergency response",
      "Personalized care plans talilored to your needs",
      "Transparent pricing with no hidden fees",
    ],
    icon: Heart,
    color: "#0284C7",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const slide = slides[current];
  const Icon = slide.icon;
  const isLast = current === slides.length - 1;

  const next = () => {
    if (isLast) return handleComplete();
    setCurrent((p) => p + 1);
  };

  const handleComplete = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    router.replace("/auth/signup");
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    router.replace("/auth/signup");
  };

  return (
    <Stack flex={1} background="#fff" paddingTop="$6" paddingBottom="$4">
      {/* Header Icon */}
      <YStack alignItems="center" paddingVertical="$6">
        <Animated.View entering={ZoomIn.duration(600)}>
          <Stack
            width={100}
            height={100}
            alignItems="center"
            justifyContent="center"
            borderRadius={50}
            background={`${slide.color}20`}
            shadowColor="#000"
            shadowOpacity={0.1}
            shadowRadius={10}
          >
            <Icon size={52} color={slide.color} strokeWidth={1.5} />
          </Stack>
        </Animated.View>
      </YStack>

      {/* Slide Content */}
      <AnimatePresence>
        <Animated.View
          key={slide.id}
          entering={FadeIn.duration(400).springify()}
          exiting={FadeOut.duration(200)}
          style={{ flex: 1, paddingHorizontal: 24 }}
        >
          <YStack alignItems="center" gap="$3">
            <Text
              fontSize={32}
              fontWeight="700"
              textAlign="center"
              color="#0C2340"
            >
              {slide.title}
            </Text>

            {slide.type === "welcome" && (
              <Text
                fontSize={16}
                textAlign="center"
                color="#0C5080"
                lineHeight={24}
              >
                {slide.subtitle}
              </Text>
            )}

            {["mission", "service"].includes(slide.type) && (
              <Text
                fontSize={16}
                textAlign="center"
                color="#475569"
                lineHeight={26}
              >
                {slide.content}
              </Text>
            )}

            {slide.type === "features" && (
              <YStack marginVertical="$3" gap="$3" width="100%">
                {slide.features?.map((f, i) => (
                  <XStack key={i} gap="$2">
                    <Stack
                      width={8}
                      height={8}
                      borderRadius={4}
                      background="#0284C7"
                      marginTop={6}
                    />
                    <Text
                      flex={1}
                      color="#475569"
                      lineHeight={22}
                      fontSize={15}
                    >
                      {f}
                    </Text>
                  </XStack>
                ))}
              </YStack>
            )}
          </YStack>
        </Animated.View>
      </AnimatePresence>

      {/* Pagination Dots */}
      <XStack justifyContent="center" marginVertical="$3" gap="$2">
        {slides.map((_, idx) => (
          <Animated.View
            key={idx}
            entering={FadeIn}
            style={{
              width: idx === current ? 26 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: idx === current ? "#0284C7" : "#E2E8F0",
              marginHorizontal: 3,
            }}
          />
        ))}
      </XStack>

      {/* Buttons */}
      <XStack paddingHorizontal="$4" gap="$3" marginBottom="$10">
        <Button
          flex={0.35}
          background="#F1F5F9"
          borderRadius="$4"
          pressStyle={{ scale: 0.96 }}
          onPress={() => handleSkip()}
        >
          <Text color="#475569" fontWeight="600">
            Skip
          </Text>
        </Button>

        <Button
          flex={0.65}
          borderRadius="$4"
          onPress={next}
          pressStyle={{ scale: 0.97 }}
        >
          <LinearGradient
            colors={["#0284C7", "#0369A1"]}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 14,
              borderRadius: 12,
              width: "100%",
            }}
          >
            <Text color="white" fontWeight="600" fontSize={16}>
              {isLast ? "Get Started" : "Next"}
            </Text>

            {!isLast && (
              <ChevronRight size={20} color="#fff" style={{ marginLeft: 6 }} />
            )}
          </LinearGradient>
        </Button>
      </XStack>
    </Stack>
  );
}
