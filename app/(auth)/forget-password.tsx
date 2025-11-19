import FieldInput from "@/components/field-input";
import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Button, ScrollView, Text, YStack } from "tamagui";

type FormValues = {
  email: string;
};

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Send reset link to:", data.email);
    // TODO: Call your backend/supabase API to send password reset link
    router.push("/(auth)/reset-password"); // navigate to next screen
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
        >
          <Text color="$background" fontWeight="600">
            Send Reset Link
          </Text>
        </Button>
      </YStack>
    </ScrollView>
  );
}
