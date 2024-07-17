const { idb } = typeof window !== "undefined" && (window as any);
// console.log({ idb });

const dbPromise = idb?.open("posts-store", 1, function (db: IDBDatabase) {
  if (!db.objectStoreNames.contains("posts")) {
    db.createObjectStore("posts", { keyPath: "id" });
  }
  if (!db.objectStoreNames.contains("sync-posts")) {
    db.createObjectStore("sync-posts", { keyPath: "id" });
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

function clearAllData(st: string) {
  return dbPromise.then(function (db: IDBDatabase) {
    var tx = db.transaction(st, "readwrite");
    var store = tx.objectStore(st);
    store.clear();
    // return tx.complete;
  });
}

function deleteItemFromData(st: string, id: string) {
  dbPromise
    .then(function (db: IDBDatabase) {
      var tx = db.transaction(st, "readwrite");
      var store = tx.objectStore(st);
      store.delete(id);
      // return tx.complete;
    })
    .then(function () {
      console.log("Item deleted!");
    });
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function dataURItoBlob(dataURI: string): Blob {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  // console.log({ byteString, mimeString });

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  // console.log({ ab, ia });

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  // console.log({ blob });
  return blob;
}
