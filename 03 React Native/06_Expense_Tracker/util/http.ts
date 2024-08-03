import axios, { AxiosResponse } from "axios";

import { ObjectI } from "../App";
// @ts-ignore
import { REACT_APP_FIREBASE_URL } from "@env";
// console.log("REACT_APP_FIREBASE_URL:", REACT_APP_FIREBASE_URL);

export async function storeExpense(expenseData: ObjectI): Promise<string | undefined> {
  try {
    const response = await axios.post(`${REACT_APP_FIREBASE_URL}/expenses.json`, expenseData);
    await console.log("response?.status:", response?.status);
    const id: string = response.data.name;
    return id;
  } catch (error) {
    console.log("error:", error);
  }
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

export async function updateExpense(id: string, expenseData: ObjectI): Promise<AxiosResponse | undefined> {
  try {
    const res = await axios.put(`${REACT_APP_FIREBASE_URL}/expenses/${id}.json`, expenseData);
    console.log("res.status:", res.status);
    return res;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function deleteExpense(id: string): Promise<AxiosResponse | undefined> {
  try {
    const res = await axios.delete(`${REACT_APP_FIREBASE_URL}/expenses/${id}.json`);
    console.log("res.status:", res.status);
    return res;
  } catch (error) {
    console.log("error:", error);
  }
}
