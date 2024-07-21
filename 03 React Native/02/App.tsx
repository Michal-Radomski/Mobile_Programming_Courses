import React from "react";
import { StyleSheet, View, FlatList, ListRenderItemInfo } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

// import Flex from "./Flex";

export default function App(): JSX.Element {
  // const [enteredGoalText, setEnteredGoalText] = React.useState<string>("");
  const [courseGoals, setCourseGoals] = React.useState([] as ItemList[]);

  function addGoalHandler(enteredGoalText: string): void {
    setCourseGoals((prevState) => [...prevState, { text: enteredGoalText, id: Math.random().toString() }]);
  }

  return (
    // <Flex />
    // <View style={styles.appContainer}>
    //   <View style={styles.inputContainer}>
    //     <TextInput style={styles.textInput} placeholder="Your course goal!" onChangeText={goalInputHandler} />
    //     <Button title="Add Goal" onPress={addGoalHandler} />
    //   </View>
    //   {/* <View style={styles.goalsContainer}>
    //     <ScrollView alwaysBounceVertical={true}>
    //       {courseGoals.map((goal: string, index: number) => (
    //         <View key={goal + String(index)} style={styles.goalItem}>
    //           <Text style={styles.goalText}>{goal}</Text>
    //         </View>
    //       ))}
    //     </ScrollView>
    //   </View> */}
    //   <View style={styles.goalsContainer}>
    //     <FlatList
    //       data={courseGoals}
    //       renderItem={(itemData: ListRenderItemInfo<ItemList>) => {
    //         // console.log("itemData:", itemData);
    //         return <GoalItem text={itemData?.item?.text} />;
    //       }}
    //       keyExtractor={(item: ItemList) => {
    //         // console.log("item:", item);
    //         return item.id;
    //       }}
    //       alwaysBounceVertical={false}
    //     />
    //   </View>
    // </View>
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData: ListRenderItemInfo<ItemList>) => {
            return <GoalItem text={itemData.item.text} />;
          }}
          keyExtractor={(item: ItemList) => {
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
  goalsContainer: {
    flex: 5,
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
