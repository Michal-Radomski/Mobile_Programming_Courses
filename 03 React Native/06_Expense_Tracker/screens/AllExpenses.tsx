import React from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ContextI, ExpensesContext } from "../store/expensesContext";

const AllExpenses = (): JSX.Element => {
  const expensesCtx: ContextI = React.useContext(ExpensesContext);
  return (
    <React.Fragment>
      <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No registered expenses found!" />
    </React.Fragment>
  );
};

export default AllExpenses;
