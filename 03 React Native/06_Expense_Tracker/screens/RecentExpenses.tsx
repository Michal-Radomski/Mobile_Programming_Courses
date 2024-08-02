import React from "react";

import { ContextI, ExpensesContext } from "../store/expensesContext";
import ExpensesOutput from "../components/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { ObjectI } from "../App";
import { fetchExpenses } from "../util/http";

function RecentExpenses(): JSX.Element {
  const expensesCtx: ContextI = React.useContext(ExpensesContext);

  React.useEffect(() => {
    (async function getExpenses(): Promise<void> {
      const expenses = (await fetchExpenses()) as ObjectI[];
      expensesCtx.setExpenses(expenses as ObjectI[]);
    })();
  }, []);

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
