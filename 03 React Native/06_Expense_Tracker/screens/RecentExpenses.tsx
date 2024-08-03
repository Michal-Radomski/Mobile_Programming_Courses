import React from "react";

import { ContextI, ExpensesContext } from "../store/expensesContext";
import ExpensesOutput from "../components/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { ObjectI } from "../App";
import { fetchExpenses } from "../util/http";
import ErrorOverlay from "../components/ErrorOverlay";
import LoadingOverlay from "../components/LoadingOverlay";

function RecentExpenses(): JSX.Element {
  const expensesCtx: ContextI = React.useContext(ExpensesContext);

  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    (async function getExpenses(): Promise<void> {
      try {
        const expenses = (await fetchExpenses()) as ObjectI[];
        expensesCtx.setExpenses(expenses as ObjectI[]);
      } catch (error) {
        console.log("error:", error);
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    })();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses: ObjectI[] = expensesCtx.expenses.filter((expense: ObjectI) => {
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
