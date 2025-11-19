import FieldInput from "@/components/field-input";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Checkbox,
  Image,
  Label,
  ScrollView,
  Text,
  XStack,
  YStack,
} from "tamagui";

type FormValues = {
  email: string;
  password: string;
};

export default function AuthScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Login:", data);
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-in");
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
            paddingHorizontal: 24,
            paddingTop: 80,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <YStack alignItems="center" marginBottom="$3">
            <Text fontSize={28} fontWeight="700" color="$color12">
              Welcome Back 👋
            </Text>
            <Text
              fontSize={14}
              color="$color10"
              textAlign="center"
              marginTop="$2"
              maxWidth={260}
            >
              Sign in to continue and manage your care services effortlessly.
            </Text>
          </YStack>

          {/* FORM */}
          <YStack gap="$1">
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

            {/* Remember me + Forgot password */}
            <XStack justifyContent="space-between" alignItems="center">
              <XStack alignItems="center" gap="$2">
                <Checkbox size="$2">
                  <Checkbox.Indicator />
                </Checkbox>
                <Label fontSize={13} color="$color11">
                  Remember me
                </Label>
              </XStack>

              <Text
                fontSize={13}
                color="$blue10"
                onPress={() => router.push("/")}
              >
                Forgot password?
              </Text>
            </XStack>

            {/* Login Button */}
            <Button
              marginTop="$2"
              backgroundColor="#1e40af"
              borderRadius="$4"
              onPress={handleSubmit(onSubmit)}
            >
              <Text fontSize={16} fontWeight="600" color="white">
                Sign In
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

            {/* Google Sign-in */}
            <Button
              backgroundColor="#f2f2f2"
              borderWidth={1}
              borderColor="$borderColor"
              borderRadius="$4"
              onPress={handleGoogleSignIn}
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
                Continue with Google
              </Text>
            </Button>
          </YStack>

          {/* FOOTER */}
          <YStack alignItems="center" marginTop="$6">
            <XStack gap="$1">
              <Text fontSize={14} color="$color10">
                Don&apos;t have an account?
              </Text>
              <Text
                fontSize={14}
                color="$blue10"
                fontWeight="700"
                onPress={() => router.push("/(auth)/signup")}
              >
                Sign Up
              </Text>
            </XStack>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
