import FieldInput from "@/components/field-input";
import { supabase } from "@/libs/supabase";
import { ResetPasswordFormData } from "@/types";
import { useRouter } from "expo-router";
import { Lock } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, ScrollView, Spinner, Text, YStack } from "tamagui";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [resetError, setResetError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm<ResetPasswordFormData>({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const { password } = data;

    setIsLoading(true);
    setResetError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password.trim(),
      });

      if (error) {
        setResetError(error.message);
        return;
      }

      router.push("/(auth)/login");
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
  };

  const passwordValue = watch("password");

  return (
    <ScrollView
      flex={1}
      background="$background"
      contentContainerStyle={{ paddingVertical: 60, paddingHorizontal: 24 }}
    >
      <YStack alignItems="center" marginBottom="$6">
        <Text fontSize={28} fontWeight="700" color="$textPrimary">
          Reset Password
        </Text>
        <Text
          fontSize={14}
          color="$textSecondary"
          textAlign="center"
          marginTop="$2"
        >
          Enter your new password below and confirm it.
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

      <YStack gap="$4">
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field, fieldState }) => (
            <FieldInput
              label="New Password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              icon={<Lock size={18} color="#1e40af" />}
              isPassword
              error={fieldState.error?.message}
              placeholder="Enter New Password"
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Confirm password is required",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
          }}
          render={({ field, fieldState }) => (
            <FieldInput
              label="Confirm Password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              icon={<Lock size={18} color="#1e40af" />}
              isPassword
              error={fieldState.error?.message}
              placeholder="Confirm Password"
            />
          )}
        />

        <Button
          backgroundColor="$blue10"
          borderRadius="$4"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          icon={isLoading ? <Spinner color="$background" /> : undefined}
        >
          <Text color="$background" fontWeight="600">
            {isLoading ? "Resetting..." : "Reset Password"}
          </Text>
        </Button>
      </YStack>
    </ScrollView>
  );
}
