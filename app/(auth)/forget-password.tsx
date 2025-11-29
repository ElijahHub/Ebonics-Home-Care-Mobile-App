import FieldInput from "@/components/field-input";
import { supabase } from "@/libs/supabase";
import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, ScrollView, Spinner, Text, YStack } from "tamagui";

type FormValues = {
  email: string;
};

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [resetError, setResetError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormValues) => {
    const { email } = data;
    setIsLoading(true);
    setResetError(null);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error) {
        setResetError(error.message);
        return;
      }

      router.push({
        pathname: "/(auth)/reset-code",
        params: { email },
      });
    } catch (error) {
      console.log(error);
      setResetError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setResetError(null);
      }, 5000);
    }
  };

  return (
    <ScrollView
      flex={1}
      background="$background"
      contentContainerStyle={{ paddingVertical: 60, paddingHorizontal: 24 }}
    >
      <YStack alignItems="center" marginBottom="$6">
        <Text fontSize={28} fontWeight="700" color="$textPrimary">
          Forgot Password
        </Text>
        <Text
          fontSize={14}
          color="$textSecondary"
          textAlign="center"
          marginTop="$2"
        >
          Enter your email address and we will send you a link to reset your
          password.
        </Text>
      </YStack>

      {resetError && (
        <YStack
          marginBottom="$4"
          padding="$3"
          backgroundColor="$red10"
          borderRadius="$4"
        >
          <Text color="$red12" fontWeight="600" textAlign="center">
            {resetError}
          </Text>
        </YStack>
      )}

      <YStack gap="$4">
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field, fieldState }) => (
            <FieldInput
              label="Email"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              icon={<Mail size={18} color="#1e40af" />}
              error={fieldState.error?.message}
              placeholder="Email Address"
            />
          )}
        />

        <Button
          backgroundColor="$blue10"
          borderRadius="$4"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          icon={isLoading ? <Spinner color="white" /> : undefined}
        >
          <Text color="$background" fontWeight="600">
            {isLoading ? "Verifying Email..." : "Send Reset Code"}
          </Text>
        </Button>
      </YStack>
    </ScrollView>
  );
}
