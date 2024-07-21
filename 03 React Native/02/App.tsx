import React from "react";
import { StyleSheet, Text, View, Button, TextInput, FlatList, ListRenderItemInfo } from "react-native";

// import Flex from "./Flex";

export default function App(): JSX.Element {
  const [enteredGoalText, setEnteredGoalText] = React.useState<string>("");
  const [courseGoals, setCourseGoals] = React.useState([] as ItemList[]);

  function goalInputHandler(enteredText: React.SetStateAction<string>): void {
    // function goalInputHandler(enteredText: ItemList): void {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler(): void {
    // console.log("enteredGoalText:", enteredGoalText);
    // setCourseGoals((prevState: string[]) => [...prevState, enteredGoalText]);
    setCourseGoals((currentCourseGoals: ItemList[]) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  }

  return (
    // <Flex />
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Your course goal!" onChangeText={goalInputHandler} />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      {/* <View style={styles.goalsContainer}>
        <ScrollView alwaysBounceVertical={true}>
          {courseGoals.map((goal: string, index: number) => (
            <View key={goal + String(index)} style={styles.goalItem}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView>
      </View> */}
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData: ListRenderItemInfo<ItemList>) => {
            // console.log("itemData:", itemData);
            return (
              <View style={styles.goalItem}>
                <Text style={styles.goalText}>
                  {itemData.item.id} {itemData.item.text}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item: ItemList) => {
            // console.log("item:", item);
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
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
  goalsContainer: {
    flex: 5,
  },
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

//* Temp
// export default function App(): JSX.Element {
//   return (
//     <View style={styles.container}>
//       <Text style={{ color: "red", fontWeight: "bold", margin: 16, borderWidth: 2, borderColor: "red", padding: 8 }}>
//         Hello World!
//       </Text>
//       <View>
//         <Text style={styles.dummyText}>Another Text!</Text>
//         <Text>Another Text2!</Text>
//       </View>

//       <Button title="Tap me" />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dummyText: {
//     margin: 16,
//     // backgroundColor: "yellow",
//     color: "green",
//   },
// });
