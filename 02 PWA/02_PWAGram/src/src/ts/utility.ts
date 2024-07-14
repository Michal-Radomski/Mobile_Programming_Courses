const { idb } = typeof window !== "undefined" && (window as any);
// console.log({ idb });

const dbPromise = idb?.open("posts-store", 1, function (db: IDBDatabase) {
  if (!db.objectStoreNames.contains("posts")) {
    db.createObjectStore("posts", { keyPath: "id" });
  }
});

function writeData(st: string, data: any) {
  return dbPromise.then(function (db: IDBDatabase) {
    const tx = db.transaction(st, "readwrite") as IDBTransaction;
    const store = tx.objectStore(st) as IDBObjectStore;
    store.put(data);
    // return tx.complete;
  });
}

function readAllData(st: string) {
  return dbPromise.then(function (db: IDBDatabase) {
    const tx = db.transaction(st, "readonly") as IDBTransaction;
    const store = tx.objectStore(st) as IDBObjectStore;
    return store.getAll();
  });
}
