import { StyleSheet, View, Text, Pressable } from "react-native";

const GoalItem = ({ text, id, onDeleteItem }: { text: string; id: string; onDeleteItem: Function }): JSX.Element => {
  return (
    <Pressable
      // onPress={onDeleteItem.bind(this, id)}
      onPress={() => onDeleteItem(id)}
      android_ripple={{ color: "#210644" }} //* Only Android!
      style={({ pressed }: { pressed: boolean }) => pressed && styles.pressedItem} //* iOS
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>
          {id} <Text style={{ color: "red", fontWeight: "bold" }}>{text}</Text>
        </Text>
      </View>
    </Pressable>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6, //* No borderRadius on iOS!
    backgroundColor: "#5e0acc",
  },
  goalText: {
    padding: 8,
    color: "white", //* Styles don't cascade!!!, no style inheritance here
  },
  pressedItem: {
    opacity: 0.5,
  },
});
