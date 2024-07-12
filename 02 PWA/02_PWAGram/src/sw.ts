(self as unknown as ServiceWorkerGlobalScope).addEventListener("install", function (event: ExtendableEvent) {
  // console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open("static").then(function (cache: Cache) {
      // console.log("cache:", cache);
      console.log("[Service Worker] Precaching App Shell");
      // cache.add("/src/js/app.js");
      cache.addAll([
        "/",
        "/index.html",
        "/src/js/app.js",
        "/src/js/feed.js",
        // "/src/js/promise.js",
        // "/src/js/fetch.js",
        "/src/css/app.css",
        "/src/css/feed.css",
        "/src/images/main-image.jpg",
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.min.js",
        "https://fonts.googleapis.com/css?family=Roboto:400,700",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
      ]);
    })
  );
});

const CACHE_STATIC_NAME = "static-v4";
const CACHE_DYNAMIC_NAME = "dynamic-v2";

(self as unknown as ServiceWorkerGlobalScope).addEventListener("activate", function (event: ExtendableEvent) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service Worker] Removing old cache.", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

(self as unknown as ServiceWorkerGlobalScope).addEventListener("fetch", function (event: FetchEvent) {
  // console.log("[Service Worker] Fetching something ....", event);
  // console.log("event.request:", event.request);
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response: Response | undefined) {
        if (response) {
          return response;
        } else {
          return fetch(event.request).then(function (res: Response) {
            return caches.open("dynamic").then(function (cache: Cache) {
              cache.put(event.request.url, res.clone());
              return res as any;
            });
          });
        }
      })
      .catch((error: Error) => console.log(error))
  );
});
