import { View, Text } from "react-native";

//* Custom Button
const PrimaryButton = ({ children }: { children: string }): JSX.Element => {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};

export default PrimaryButton;
