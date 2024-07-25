import { View, Text, Pressable, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

//* Custom Button
const PrimaryButton = ({ children, onPress }: { children: React.ReactNode; onPress?: () => void }): JSX.Element => {
  // function pressHandler(): void {
  //   // console.log("Pressed!");
  //   onPress();
  // }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }: { pressed: boolean }) =>
          pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: Colors.colorWhite,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
