import axios from "axios";

import { ObjectI } from "../App";
// @ts-ignore
import { REACT_APP_FIREBASE_URL } from "@env";
// console.log("REACT_APP_FIREBASE_URL:", REACT_APP_FIREBASE_URL);

export function storeExpense(expenseData: ObjectI): void {
  axios
    .post(`${REACT_APP_FIREBASE_URL}/expenses.json`, expenseData)
    .then((res) => console.log("res?.status:", res?.status))
    .catch((err) => console.log("err:", err));
}

export async function fetchExpenses(): Promise<ObjectI[] | undefined> {
  try {
    const response = await axios.get(`${REACT_APP_FIREBASE_URL}/expenses.json`);
    // console.log("response?.data:", response?.data);
    console.log("response?.status:", response?.status);
    const expenses = [] as ObjectI[];

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }
    return expenses;
  } catch (error) {
    console.log("error:", error);
  }
}
