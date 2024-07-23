import { View, Text, Pressable, StyleSheet } from "react-native";

//* Custom Button
const PrimaryButton = ({ children, onPress }: { children: string; onPress: () => void }): JSX.Element => {
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
        android_ripple={{ color: "#640233" }}
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
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
