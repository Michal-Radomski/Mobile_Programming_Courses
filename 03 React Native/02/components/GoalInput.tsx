import React from "react";
import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";

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
        <Image style={styles.image} source={require("../assets/images/goal.png")} />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={() => onCancel()} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#5e0acc" />
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
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
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
