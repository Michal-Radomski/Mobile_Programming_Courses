import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
};

function IconButton({ icon, color, onPress }: IconProps): JSX.Element {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
