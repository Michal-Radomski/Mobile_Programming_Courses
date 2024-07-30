import React from "react";

import ExpensesOutput, { DUMMY_EXPENSES } from "../components/ExpensesOutput";

const AllExpenses = (): JSX.Element => {
  return (
    <React.Fragment>
      <ExpensesOutput expensesPeriod="Total" expenses={DUMMY_EXPENSES} />
    </React.Fragment>
  );
};

export default AllExpenses;
