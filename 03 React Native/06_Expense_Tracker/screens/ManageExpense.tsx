import React from "react";
import { StyleSheet, View } from "react-native";
import { RouteProp, ParamListBase, NavigationProp } from "@react-navigation/native";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/IconButton";
import { ContextI, ExpensesContext } from "../store/expensesContext";
import ExpenseForm from "../components/ExpenseForm";
import { ObjectI } from "../App";
import { storeExpense } from "../util/http";

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

  const selectedExpense = expensesCtx.expenses.find((expense: ObjectI) => expense.id === editedExpenseId) as ObjectI;

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

  async function confirmHandler(expenseData: ObjectI): Promise<void> {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
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
