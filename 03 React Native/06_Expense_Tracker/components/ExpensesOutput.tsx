import { View, StyleSheet, Text } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { ObjectI } from "../App";
import { GlobalStyles } from "../constants/styles";

//* Moved to the expensesContext.tsx
// export const DUMMY_EXPENSES: ObjectI[] = [
//   {
//     id: "e1",
//     description: "A pair of shoes",
//     amount: 59.99,
//     date: new Date("2021-12-19"),
//   },
//   {
//     id: "e2",
//     description: "A pair of trousers",
//     amount: 89.29,
//     date: new Date("2022-01-05"),
//   },
//   {
//     id: "e3",
//     description: "Some bananas",
//     amount: 5.99,
//     date: new Date("2021-12-01"),
//   },
//   {
//     id: "e4",
//     description: "A book",
//     amount: 14.99,
//     date: new Date("2022-02-19"),
//   },
//   {
//     id: "e5",
//     description: "Another book",
//     amount: 18.59,
//     date: new Date("2022-02-18"),
//   },
//   {
//     id: "f1",
//     description: "A pair of shoes",
//     amount: 59.99,
//     date: new Date("2021-12-19"),
//   },
//   {
//     id: "f2",
//     description: "A pair of trousers",
//     amount: 89.29,
//     date: new Date("2022-01-05"),
//   },
//   {
//     id: "f3",
//     description: "Some bananas",
//     amount: 5.99,
//     date: new Date("2021-12-01"),
//   },
//   {
//     id: "f4",
//     description: "A book",
//     amount: 14.99,
//     date: new Date("2022-02-19"),
//   },
//   {
//     id: "f5",
//     description: "Another book",
//     amount: 18.59,
//     date: new Date("2022-02-18"),
//   },
// ];

function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
}: {
  expenses: ObjectI[];
  expensesPeriod: string;
  fallbackText?: string;
}): JSX.Element {
  let content: JSX.Element = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
