import FieldInput from "@/components/field-input";
import { useRouter } from "expo-router";
import { ChevronLeft, Lock, Mail, Phone, User2 } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Image, ScrollView, Text, XStack, YStack } from "tamagui";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpScreen() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Sign-up data:", data);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          flex={1}
          backgroundColor="$background"
          contentContainerStyle={{
            paddingTop: 80,
            paddingHorizontal: 24,
            paddingBottom: 40,
          }}
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            style={{ position: "absolute", top: 40, left: 20 }}
          >
            <ChevronLeft size={28} color="black" />
          </TouchableOpacity>

          {/* Header */}
          <YStack alignItems="center" marginBottom="$6">
            <Text fontSize={30} fontWeight="700" color="$color12">
              Create Account
            </Text>
            <Text
              fontSize={14}
              color="$color10"
              textAlign="center"
              maxWidth={280}
              marginTop="$2"
            >
              Sign up to get started with quick access to premium care services.
            </Text>
          </YStack>

          {/* FORM FIELDS */}
          <YStack gap="$1">
            {/* Name */}
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <FieldInput
                  label="Full Name"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  icon={<User2 size={15} color="#1e40af" />}
                  error={fieldState.error?.message}
                  placeholder="Full Name"
                />
              )}
            />

            {/* Email */}
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
                  icon={<Mail size={15} color="#1e40af" />}
                  error={fieldState.error?.message}
                  placeholder="Email Address"
                />
              )}
            />

            {/* Phone */}
            <Controller
              control={control}
              name="phone"
              rules={{ required: "Phone Number is required" }}
              render={({ field, fieldState }) => (
                <FieldInput
                  label="Phone No"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  icon={<Phone size={15} color="#1e40af" />}
                  error={fieldState.error?.message}
                  placeholder="Phone Number"
                />
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field, fieldState }) => (
                <FieldInput
                  label="Password"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  icon={<Lock size={15} color="#1e40af" />}
                  error={fieldState.error?.message}
                  placeholder="Password"
                  isPassword={true}
                />
              )}
            />

            {/* Confirm Password */}
            <Controller
              control={control}
              name="confirmPassword"
              rules={{ required: " Confirm Password is required" }}
              render={({ field, fieldState }) => (
                <FieldInput
                  label="Confirm Password"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  icon={<Lock size={15} color="#1e40af" />}
                  error={fieldState.error?.message}
                  placeholder="Confirm Password"
                  isPassword={true}
                />
              )}
            />

            {/* Sign Up Button */}
            <Button
              marginTop="$2"
              backgroundColor="#1e40af"
              borderRadius="$4"
              onPress={handleSubmit(onSubmit)}
            >
              <Text fontSize={16} fontWeight="600" color="white">
                Create Account
              </Text>
            </Button>

            {/* Divider */}
            <YStack marginVertical="$4">
              <XStack alignItems="center" gap="$3">
                <YStack flex={1} height={1} backgroundColor="$color6" />
                <Text fontSize={13} color="$color9">
                  OR CONTINUE WITH
                </Text>
                <YStack flex={1} height={1} backgroundColor="$color6" />
              </XStack>
            </YStack>

            {/* Google Sign-Up */}
            <Button
              backgroundColor="$background"
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$4"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                source={{ uri: "https://www.google.com/favicon.ico" }}
                width={20}
                height={20}
              />
              <Text fontSize={15} fontWeight="600" color="$color12">
                Sign up with Google
              </Text>
            </Button>
          </YStack>

          {/* Footer */}
          <YStack alignItems="center" marginTop="$6">
            <XStack gap="$1">
              <Text fontSize={14} color="$color10">
                Already have an account?
              </Text>
              <Text
                fontSize={14}
                color="$blue10"
                fontWeight="700"
                onPress={() => router.push("/(auth)/login")}
              >
                Log In
              </Text>
            </XStack>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
