import React from "react";

import ExpensesOutput from "../components/ExpensesOutput";

const AllExpenses = (): JSX.Element => {
  return (
    <React.Fragment>
      <ExpensesOutput expensesPeriod="Total" expenses={[]} />
    </React.Fragment>
  );
};

export default AllExpenses;
