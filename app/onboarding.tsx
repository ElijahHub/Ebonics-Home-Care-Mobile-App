import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions } from "react-native";
import { Button, Image, Text, XStack, YStack } from "tamagui";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Welcome to CareEase!",
    description:
      "Your go-to app for managing home care with ease. Track your schedule, connect with patients, and deliver the best care right from your fingertips.",
    image:
      "https://images.pexels.com/photos/6647035/pexels-photo-6647035.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "Find Quality Care",
    description:
      "Connect with experienced, vetted caregivers in your area. Browse profiles, read reviews, and find the perfect match for your loved ones.",
    image:
      "https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Flexible Scheduling",
    description:
      "Book care on your terms. Schedule visits, manage appointments, and get real-time updates on caregiver arrivals.",
    image:
      "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "Secure & Trusted",
    description:
      "Your safety is our priority. All caregivers are background-checked, insured, and trained to provide professional care.",
    image:
      "https://images.pexels.com/photos/7551586/pexels-photo-7551586.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      router.replace("/(auth)/login");
    }
  };

  const handleSkip = async () => {
    // mark onboarding as completed
    await AsyncStorage.setItem("onboardingCompleted", "true");

    // navigate to role selection / login
    router.replace("/(auth)/login");
  };

  const currentSlide = onboardingData[currentIndex];

  return (
    <YStack flex={1} background="$background">
      {/* Skip button */}
      <Button
        position="absolute"
        top={60}
        right={20}
        zIndex={10}
        size="$2"
        onPress={handleSkip}
        chromeless
      >
        <Text fontSize={16} fontWeight="600" color="$primary">
          Skip
        </Text>
      </Button>

      {/* Image section */}
      <YStack
        width={width}
        height={width * 1.2}
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
        overflow="hidden"
      >
        <Image
          source={{ uri: currentSlide.image }}
          width="100%"
          height="100%"
          resizeMode="cover"
        />
      </YStack>

      {/* Content section */}
      <YStack
        flex={1}
        paddingHorizontal="$6"
        paddingTop="$8"
        alignItems="center"
      >
        <Text
          fontSize={28}
          fontWeight="700"
          color="$textPrimary"
          textAlign="center"
          marginBottom="$4"
        >
          {currentSlide.title}
        </Text>

        <Text
          fontSize={16}
          color="$textSecondary"
          textAlign="center"
          lineHeight={24}
          marginBottom="$8"
        >
          {currentSlide.description}
        </Text>

        {/* Pagination dots */}
        <XStack gap="$2" marginBottom="$8">
          {onboardingData.map((_, index) => (
            <YStack
              key={index}
              width={index === currentIndex ? 24 : 8}
              height={8}
              borderRadius={4}
              background={index === currentIndex ? "$primary" : "$muted"}
            />
          ))}
        </XStack>

        {/* Next / Get Started button */}
        <Button
          width="100%"
          backgroundColor="$primary"
          borderRadius={12}
          paddingVertical="$4"
          onPress={handleNext}
        >
          <Text fontSize={16} fontWeight="600" color="$background">
            {currentIndex === onboardingData.length - 1
              ? "Get Started"
              : "Next"}
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
}
