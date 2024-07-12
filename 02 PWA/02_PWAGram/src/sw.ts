(self as any).addEventListener("install", function (event: CustomEvent) {
  // console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open("static").then(function (cache) {
      // console.log("cache:", cache);
      console.log("[Service Worker] Precaching App Shell");
      // cache.add("/src/js/app.js");
      cache.addAll([
        "/",
        "/index.html",
        "/src/js/app.js",
        "/src/js/feed.js",
        "/src/js/promise.js",
        "/src/js/fetch.js",
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

self.addEventListener("activate", function (_event: Event) {
  // console.log("[Service Worker] Activating Service Worker ...", _event);
  return self.clients.claim();
});

(self as any).addEventListener("fetch", function (event: FetchEvent) {
  // console.log("[Service Worker] Fetching something ....", event);
  // console.log("event.request:", event.request);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function (res) {
          return caches.open("dynamic").then(function (cache) {
            cache.put(event.request.url, res.clone());
            return res;
          });
        });
      }
    })
  );
});
