import { RootState } from "../../04_Meal_App/screens/MealDetailScreen";
import React from "react";

import { ObjectI } from "../App";

const DUMMY_EXPENSES: ObjectI[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e9",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

export interface ContextI {
  expenses: ObjectI[];
  addExpense: Function;
  deleteExpense: Function;
  updateExpense: Function;
}

export const ExpensesContext = React.createContext({} as ContextI);

function expensesReducer(state: ObjectI[], action: { type: string; payload: RootState }): RootState {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex: number = state.findIndex((expense: ObjectI) => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense: ObjectI) => expense.id !== action.payload);

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [expensesState, dispatch] = React.useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: ObjectI): void {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id: string): void {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, expenseData: ObjectI): void {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const contextValue = { expenses: expensesState, addExpense, deleteExpense, updateExpense } as ContextI;

  return <ExpensesContext.Provider value={contextValue}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
