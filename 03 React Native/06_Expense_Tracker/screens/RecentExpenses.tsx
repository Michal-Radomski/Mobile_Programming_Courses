import React from "react";

import { ContextI, ExpensesContext } from "../store/expensesContext";
import ExpensesOutput from "../components/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { ObjectI } from "../App";

function RecentExpenses(): JSX.Element {
  const expensesCtx: ContextI = React.useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense: ObjectI) => {
    const today = new Date();
    const date7DaysAgo: Date = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
