import { StyleSheet, View, Text, Pressable } from "react-native";

const GoalItem = ({ text, id, onDeleteItem }: { text: string; id: string; onDeleteItem: Function }): JSX.Element => {
  return (
    <Pressable
      // onPress={onDeleteItem.bind(this, id)}
      onPress={() => onDeleteItem(id)}
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>
          {id} <Text style={{ color: "red" }}>{text}</Text>
        </Text>
      </View>
    </Pressable>
  );
};

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
