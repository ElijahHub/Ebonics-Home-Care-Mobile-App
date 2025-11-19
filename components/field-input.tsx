import { Eye, EyeClosed } from "lucide-react-native";
import { useState } from "react";
import { Button, Input, Stack, Text, YStack } from "tamagui";

export default function FieldInput({
  label,
  value,
  onChange,
  onBlur,
  icon,
  isPassword = false,
  placeholder,
  error,
}: any) {
  const [showPassword, setShowPassword] = useState(false);
  const shouldFloat = value?.length > 0;

  return (
    <YStack marginBottom="$4">
      <Stack position="relative">
        {/* Input */}
        <Input
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          secureTextEntry={isPassword && !showPassword}
          paddingLeft="$7"
          paddingRight={isPassword ? "$10" : "$3"}
          borderRadius="$3"
          borderWidth={1}
          borderColor={error ? "$red10" : "$gray6"}
          backgroundColor="$background"
          fontSize="$5"
          placeholder={placeholder}
        />

        {/* Icon Left */}
        <Stack position="absolute" left={12} top="30%" translateY={-8}>
          {icon}
        </Stack>

        {/* Show/Hide password icon */}
        {isPassword && (
          <Button
            position="absolute"
            right={12}
            top="40%"
            style={{ transform: [{ translateY: -8 }] }}
            size="$2"
            chromeless
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
          </Button>
        )}
      </Stack>

      {/* Floating label */}
      {shouldFloat && (
        <Text
          position="absolute"
          left={12}
          top={-10}
          fontSize={13}
          backgroundColor="$transparent"
          color={error ? "$red10" : "$gray10"}
          paddingHorizontal={6}
        >
          {label}
        </Text>
      )}

      {/* Error message */}
      {!!error && (
        <Text color="$red10" fontSize="$3" marginTop="$1">
          {error}
        </Text>
      )}
    </YStack>
  );
}
