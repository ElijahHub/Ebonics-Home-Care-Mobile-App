import { supabase } from "@/libs/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StatusBar, TouchableOpacity } from "react-native";
import { Button, Input, Spinner, Text, XStack, YStack } from "tamagui";

export default function VerificationScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [resetError, setResetError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ================================
  //  React Hook Form
  // ================================
  const { control, getValues } = useForm({
    defaultValues: { code: ["", "", "", "", "", ""] },
  });

  // Refs
  const inputsRef = useRef<any[]>([]);

  const handleChange = (value: string, index: number, onChange: any) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const current = getValues("code");
    current[index] = value;
    onChange([...current]);

    if (value && index < 5) inputsRef.current[index + 1]?.focus();
    if (!value && index > 0) inputsRef.current[index - 1]?.focus();
  };

  // ================================
  //  Resend Timer
  // ================================
  const RESEND_DURATION = 30;
  const [timer, setTimer] = useState(RESEND_DURATION);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: any;

    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (!canResend) return;

    console.log("Resending OTP to:", email);
    setResetError(null);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email as string,
      });

      if (error) {
        setResetError(error.message);
        return;
      }
    } catch (error) {
      console.log(error);
      setResetError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setResetError(null);
      }, 5000);
    }

    setTimer(RESEND_DURATION);
    setCanResend(false);
  };

  // ================================
  //  Submit
  // ================================
  const onSubmit = async () => {
    const code = getValues("code").join("");
    console.log("Submitted OTP:", code);

    if (!email) {
      console.log("Email not found. Please start over.");
      router.push("/(auth)/forget-password");
      return;
    }

    setResetError(null);
    setIsLoading(true);

    try {
      const { data: authData, error } = await supabase.auth.verifyOtp({
        email: email as string,
        token: code,
        type: "signup",
      });

      if (error) {
        console.log("Verification Error", error.message);
        setResetError(error.message);
        return;
      }

      console.log("Verification Success", authData);

      router.push("/(auth)/reset-password");
    } catch (error) {
      console.error("Runtime/Unexpected Error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown error occurred during signup.";
      setResetError(`Verification failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setResetError(null);
      }, 4000);
    }

    // router.push("/next-step");
  };

  // ================================
  //  UI
  // ================================
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
      <TouchableOpacity
        onPress={() => router.push("/(auth)/forget-password")}
        style={{ position: "absolute", top: 40, left: 20 }}
      >
        <ChevronLeft size={28} color="black" />
      </TouchableOpacity>

      {/* Header */}
      <YStack marginTop="$4" gap="$2">
        <Text fontSize={28} fontWeight="700" color="#000">
          Enter 6-digit code
        </Text>

        <Text fontSize={14} color="#666" lineHeight={20}>
          We sent a verification code to{"\n"}
          <Text color="#4A9EF8">{email}</Text>
        </Text>
      </YStack>

      {resetError && (
        <YStack
          marginTop="$4"
          padding="$3"
          backgroundColor="#FEE2E2"
          borderRadius="$4"
        >
          <Text color="#B91C1C" fontWeight="600" textAlign="center">
            {resetError}
          </Text>
        </YStack>
      )}

      {/* OTP Inputs */}
      <Controller
        control={control}
        name="code"
        render={({ field: { value, onChange } }) => (
          <XStack
            justifyContent="space-between"
            marginTop="$8"
            paddingHorizontal="$2"
            gap="$2"
          >
            {value.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  if (el) inputsRef.current[index] = el;
                }}
                value={digit}
                onChangeText={(v) => handleChange(v, index, onChange)}
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
        )}
      />

      {/* Resend logic */}
      <XStack marginTop="$6" justifyContent="center" gap="$2">
        {canResend ? (
          <Text
            fontSize={13}
            color="#4A9EF8"
            fontWeight="600"
            onPress={handleResend}
          >
            Resend code
          </Text>
        ) : (
          <Text fontSize={13} color="#999">
            Resend in {timer}s
          </Text>
        )}
      </XStack>

      {/* Continue */}
      <YStack flex={1} justifyContent="flex-end">
        <Button
          size="$5"
          backgroundColor="#1e40af"
          borderRadius="$4"
          pressStyle={{ opacity: 0.9 }}
          onPress={onSubmit}
          disabled={isLoading}
          icon={isLoading ? <Spinner color="white" /> : undefined}
        >
          <Text fontSize={16} fontWeight="600" color="#FFF">
            {isLoading ? "Verifying..." : "Continue"}
          </Text>
        </Button>
      </YStack>
    </YStack>
  );
}
