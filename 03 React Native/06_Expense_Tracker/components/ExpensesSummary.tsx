import { View, Text } from "react-native";
import { ObjectI } from "../App";

function ExpensesSummary({ expenses, periodName }: { expenses: ObjectI[]; periodName: string }): JSX.Element {
  const expensesSum = expenses.reduce((sum: number, expense: ObjectI) => {
    return sum + (expense.amount as number);
  }, 0);

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;
