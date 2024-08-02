import axios from "axios";

import { ObjectI } from "../App";
// @ts-ignore
import { REACT_APP_FIREBASE_URL } from "@env";
// console.log("REACT_APP_FIREBASE_URL:", REACT_APP_FIREBASE_URL);

export function storeExpense(expenseData: ObjectI): void {
  axios.post(`${REACT_APP_FIREBASE_URL}/expenses.json`, expenseData).then((res) => console.log("res?.status:", res?.status));
}
