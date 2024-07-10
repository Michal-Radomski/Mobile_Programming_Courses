self.addEventListener("install", function (event: Event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
});

self.addEventListener("activate", function (event: Event) {
  console.log("[Service Worker] Activating Service Worker ...", event);
  return self.clients.claim();
});

(self as any).addEventListener("fetch", function (event: CustomEvent) {
  console.log("[Service Worker] Fetching something ....", event);
  // console.log("event.request:", event.request);
  event.respondWith?.(fetch(event.request!));
});
