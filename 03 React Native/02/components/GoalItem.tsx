import { StyleSheet, View, Text } from "react-native";

function GoalItem({ text }: { text: string }): JSX.Element {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{text}</Text>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6, //* No borderRadius on iOS!
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white", //* Styles don't cascade!!!, no style inheritance here
  },
});
