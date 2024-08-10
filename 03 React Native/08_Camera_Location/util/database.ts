import * as SQLite from "expo-sqlite";

import { Place } from "../models/Place";

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

export async function insertPlace(place: Place): Promise<SQLite.SQLiteRunResult | undefined> {
  try {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?) RETURNING *;`,
      [place.title, place.imageUri, place.address, place.location.lat, place.location.lng]
    );
    console.log("result:", result);
    return result;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function fetchPlaces(): Promise<PlaceI[] | undefined> {
  try {
    const res = (await database.getAllAsync(`SELECT * FROM places;`)) as PlaceI[];
    // console.log("res:", res);

    const places = [] as PlaceI[];
    for (const row of res) {
      places.push(row);
    }
    return places;
  } catch (error) {
    console.error({ error });
  }
}
