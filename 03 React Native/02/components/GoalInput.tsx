import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const GoalInput = ({ onAddGoal }: { onAddGoal: Function }): JSX.Element => {
  const [enteredGoalText, setEnteredGoalText] = React.useState<string>("");

  function addGoalHandler(): void {
    // console.log("enteredGoalText:", enteredGoalText);
    // setCourseGoals((prevState: string[]) => [...prevState, enteredGoalText]);
    // setCourseGoals((currentCourseGoals: ItemList[]) => [
    //   ...currentCourseGoals,
    //   { text: enteredGoalText, id: Math.random().toString() },
    // ]);

    onAddGoal(enteredGoalText);
    setEnteredGoalText("");
  }

  function goalInputHandler(enteredText: React.SetStateAction<string>): void {
    // function goalInputHandler(enteredText: ItemList): void {
    setEnteredGoalText(enteredText);
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Your course goal!"
        onChangeText={goalInputHandler}
        value={enteredGoalText}
      />
      <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
});
