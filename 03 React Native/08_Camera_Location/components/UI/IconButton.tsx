import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress: () => void;
  size: number;
};

const IconButton = ({ icon, size, color, onPress }: IconProps): JSX.Element => {
  return (
    <React.Fragment>
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
        <Ionicons name={icon} size={size} color={color} />
      </Pressable>
    </React.Fragment>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
