import React from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const GoalInput = ({
  onAddGoal,
  visible,
  onCancel,
}: {
  onAddGoal: Function;
  visible: boolean;
  onCancel: Function;
}): JSX.Element => {
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
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={() => onCancel()} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
