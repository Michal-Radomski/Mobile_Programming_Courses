(self as any).addEventListener("install", function (event: CustomEvent) {
  // console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open("static").then(function (cache: Cache) {
      // console.log("cache:", cache);
      console.log("[Service Worker] Precaching App Shell");
      cache.add("/src/js/app.js");
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
  event.respondWith?.(fetch(event.request!));
});
