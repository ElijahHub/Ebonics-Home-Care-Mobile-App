import FieldInput from "@/components/field-input";
import { useRouter } from "expo-router";
import { Lock } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Button, ScrollView, Text, YStack } from "tamagui";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Set new password:", data.password);
    // TODO: Call your backend/supabase API to set new password
    router.replace("/(auth)/reset-code"); // redirect to login after success
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
        >
          <Text color="$background" fontWeight="600">
            Reset Password
          </Text>
        </Button>
      </YStack>
    </ScrollView>
  );
}
