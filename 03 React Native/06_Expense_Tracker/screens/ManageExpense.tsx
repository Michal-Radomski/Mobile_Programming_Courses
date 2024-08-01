import { useLayoutEffect } from "react";
import { Text } from "react-native";
import { RouteProp, ParamListBase, NavigationProp } from "@react-navigation/native";

function ManageExpense({
  route,
  navigation,
}: {
  route: RouteProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
}): JSX.Element {
  const editedExpenseId = (route.params as any)?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return <Text>ManageExpense Screen</Text>;
}

export default ManageExpense;
