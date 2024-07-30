import { FlatList, Text } from "react-native";
import { ObjectI } from "../App";

function renderExpenseItem(itemData: { item: ObjectI }): JSX.Element {
  // console.log("itemData:", itemData);
  return <Text>{itemData.item.description as string}</Text>;
}

function ExpensesList({ expenses }: { expenses: ObjectI[] }): JSX.Element {
  return <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id as string} />;
}

export default ExpensesList;
