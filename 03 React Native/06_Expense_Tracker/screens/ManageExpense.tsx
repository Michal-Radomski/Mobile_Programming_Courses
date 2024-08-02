import React from "react";
import { StyleSheet, View } from "react-native";
import { RouteProp, ParamListBase, NavigationProp } from "@react-navigation/native";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/IconButton";
import { ContextI, ExpensesContext } from "../store/expensesContext";
import ExpenseForm from "../components/ExpenseForm";

function ManageExpense({
  route,
  navigation,
}: {
  route: RouteProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
}): JSX.Element {
  const expensesCtx: ContextI = React.useContext(ExpensesContext);

  const editedExpenseId = (route.params as any)?.expenseId;
  const isEditing: boolean = !!editedExpenseId;
  // console.log({ editedExpenseId, isEditing });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler(): void {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler(): void {
    navigation.goBack();
  }

  function confirmHandler(): void {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Test!!!!",
        amount: 29.99,
        date: new Date("2022-05-20"),
      });
    } else {
      expensesCtx.addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2022-05-19"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm submitButtonLabel={isEditing ? "Update" : "Add"} onSubmit={confirmHandler} onCancel={cancelHandler} />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
