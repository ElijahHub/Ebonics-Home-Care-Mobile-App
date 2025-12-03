import { TouchableOpacity } from "react-native";
import { Text, XStack, YStack } from "tamagui";

export default function ActionCard({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <XStack
        backgroundColor="white"
        borderRadius="$5"
        padding="$6"
        alignItems="center"
        justifyContent="space-between"
        borderColor="$gray200"
        borderWidth={1}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.08}
        shadowRadius={5}
        elevation={3}
        marginBottom="$3"
      >
        <XStack alignItems="center" space="$4" flex={1}>
          {icon}
          <YStack>
            <Text fontSize="$5" fontWeight="700" color="$gray800">
              {title}
            </Text>
            <Text fontSize="$3" color="$gray500">
              {subtitle}
            </Text>
          </YStack>
        </XStack>

        <Text fontSize="$6" color="$gray300">
          ›
        </Text>
      </XStack>
    </TouchableOpacity>
  );
}
