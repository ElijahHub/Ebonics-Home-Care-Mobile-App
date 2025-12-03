import FieldInput from "@/components/field-input";
import { supabase } from "@/libs/supabase";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Checkbox,
  Image,
  Label,
  ScrollView,
  Spinner,
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
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [dbError, setDbError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value: FormValues) => {
    const { email, password } = value;
    let userRole: string | null = null;

    setIsLoading(true);
    setDbError(null);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        console.error("Sign in error:", authError.message);
        setDbError(authError.message);
        return;
      }

      const userId = authData.user?.id;
      if (!userId) return;

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (roleError) {
        console.error("Database Error: Failed to fetch user roles.", roleError);
        setDbError(roleError.message);
        return;
      }

      if (roleData && roleData.length > 0) {
        userRole = roleData[0].role;
      }

      console.log(userRole);

      // Step 4: Route based on the determined role
      switch (userRole) {
        case "admin":
          router.replace("/client/message");
          break;
        case "caregiver":
          router.replace("/client/schedule");
          break;
        case "client":
          router.replace("/client"); // Default route for clients
          break;
        default:
          router.replace("/client"); // Default route for clients
          break;
      }
    } catch (error: any) {
      console.error("Runtime/Unexpected Error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown error occurred during signup.";

      setDbError(`Signup failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setDbError(null);
      }, 3000);
    }
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

          {dbError && (
            <YStack
              marginBottom="$4"
              padding="$3"
              backgroundColor="$red10"
              borderRadius="$4"
            >
              <Text color="$red12" fontWeight="600" textAlign="center">
                {dbError}
              </Text>
            </YStack>
          )}

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
                onPress={() => router.push("/auth/forget-password")}
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
              disabled={isLoading}
              icon={isLoading ? <Spinner color="white" /> : undefined}
            >
              <Text fontSize={16} fontWeight="600" color="white">
                {isLoading ? "Signing In..." : "Sign In"}
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
                onPress={() => router.push("/auth/signup")}
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
