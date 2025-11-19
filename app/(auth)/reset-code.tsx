import { ChevronLeft } from "lucide-react-native";
import { useRef, useState } from "react";
import { StatusBar } from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";

export default function VerificationScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const inputsRef = useRef<any[]>([]);

  const handleCodeChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // only digits
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // Backspace moves back
    if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <YStack
      flex={1}
      backgroundColor="#FFF"
      paddingHorizontal="$6"
      paddingTop="$10"
      paddingBottom="$6"
    >
      <StatusBar barStyle="dark-content" />
      {/* Back Button */}
      <XStack paddingVertical="$3">
        <ChevronLeft size={24} color="#666" />
      </XStack>

      {/* Header */}
      <YStack marginTop="$4" gap="$2">
        <Text fontSize={28} fontWeight="700" color="#000">
          Enter 6-digit code
        </Text>
        <Text fontSize={14} color="#666" lineHeight={20}>
          We sent a verification code to{"\n"}your email{" "}
          <Text color="#4A9EF8">gf.cruz@gmail.com</Text>
        </Text>
      </YStack>

      {/* OTP Inputs */}
      <XStack
        justifyContent="space-between"
        marginTop="$8"
        paddingHorizontal="$2"
        gap="$2"
      >
        {code.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => {
              if (el) inputsRef.current[index] = el;
            }}
            value={digit}
            onChangeText={(v) => handleCodeChange(v, index)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            fontSize={28}
            fontWeight="700"
            width={50}
            height={60}
            borderRadius={12}
            backgroundColor="#F0F0F5"
            borderWidth={0}
          />
        ))}
      </XStack>

      {/* Resend */}
      <XStack marginTop="$6" justifyContent="center" gap="$2">
        <Text fontSize={13} color="#999">
          You didn&apos;t receive a code?
        </Text>
        <Text fontSize={13} color="#4A9EF8" fontWeight="600">
          Resend code
        </Text>
      </XStack>

      {/* Continue */}
      <YStack flex={1} justifyContent="flex-end">
        <Button
          size="$5"
          backgroundColor="#1e40af"
          borderRadius="$4"
          pressStyle={{ opacity: 0.9 }}
          onPress={() => {}}
        >
          <Text fontSize={16} fontWeight="600" color="#FFF">
            Continue
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
}
