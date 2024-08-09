import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabaseSync("places.db");

export async function init(): Promise<SQLite.SQLiteRunResult | undefined> {
  try {
    const result = await database.runAsync(`CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imageUri TEXT NOT NULL,
    address TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL
  )`);
    // console.log("result:", result);

    return result;
  } catch (error) {
    console.log("error:", error);
  }
}
