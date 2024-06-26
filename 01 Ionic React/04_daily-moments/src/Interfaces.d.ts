import { DocumentSnapshot } from "@firebase/firestore";

export interface RouteParams {
  id: string;
}

export interface ObjectI {
  [key: string]: string | number | boolean;
}

export interface Entry {
  id: string;
  date: string;
  title: string;
  pictureUrl: string;
  description: string;
}

export function toEntry(doc: DocumentSnapshot): Entry {
  return { id: doc.id, ...doc.data() } as Entry;
}
