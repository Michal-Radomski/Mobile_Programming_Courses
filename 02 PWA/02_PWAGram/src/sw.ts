importScripts("/src/js/idb.js");
importScripts("/src/js/utility.js");

const CACHE_STATIC_NAME = "static-v2";
const CACHE_DYNAMIC_NAME = "dynamic-v2";
const STATIC_FILES = [
  "/",
  "/index.html",
  "/offline.html",
  "/src/js/app.js",
  "/src/js/feed.js",
  "/src/js/promise.js",
  "/src/js/fetch.js",
  "/src/js/idb.js",
  "/src/css/app.css",
  "/src/css/feed.css",
  "/src/images/main-image.jpg",
  "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.min.js",
  "https://fonts.googleapis.com/css?family=Roboto:400,700",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
];

// function trimCache(cacheName: string, maxItems: number) {
//   caches.open(cacheName).then(function (cache) {
//     return cache.keys().then(function (keys) {
//       if (keys.length > maxItems) {
//         cache.delete(keys[0]).then(trimCache(cacheName, maxItems) as any);
//       }
//     });
//   });
// }

(self as unknown as ServiceWorkerGlobalScope).addEventListener("install", function (event: ExtendableEvent) {
  // console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(function (cache: Cache) {
      // console.log("cache:", cache);
      console.log("[Service Worker] Precaching App Shell");
      // cache.add("/src/js/app.js");
      cache.addAll(STATIC_FILES);
    })
  );
});

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
  return (self as unknown as ServiceWorkerGlobalScope).clients.claim();
});

function isInArray(string: string, array: string[]): boolean {
  let cachePath;
  if (string.indexOf(self.origin) === 0) {
    // request targets domain where we serve the page from (i.e. NOT a CDN)
    console.log("matched ", string);
    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1;
}

(self as unknown as ServiceWorkerGlobalScope).addEventListener("fetch", function (event: FetchEvent) {
  // const url = "https://httpbin.org/get";
  const { FB_URL } = typeof window !== "undefined" && (window as any); //* Doesn't work!
  // console.log({ FB_URL });
  const url = FB_URL || "";

  if (event.request.url.indexOf(url) > -1) {
    const { idb, writeData, clearAllData } = typeof window !== "undefined" && (window as any);
    // console.log({ idb }); //* idb undefined

    // event.respondWith(
    //   caches.open(CACHE_DYNAMIC_NAME).then(function (cache: Cache) {
    //     return fetch(event.request).then(function (res: Response) {
    //       //  trimCache(CACHE_DYNAMIC_NAME, 3);
    //       cache.put(event.request, res.clone());
    //       return res;
    //     });
    //   })
    // );
    event.respondWith(
      fetch(event.request).then(function (res) {
        // console.log("res:", res);
        const clonedRes = res.clone();
        // console.log("clonedRes:", clonedRes);
        // console.log({ idb });

        // idb &&
        //   clonedRes.json().then(function (data) {
        //     // console.log("data:", data);
        //     for (let key in data) {
        //       writeData("posts", data[key]); //* Doesn't work
        //     }
        //   });

        idb &&
          clearAllData("posts")
            .then(function () {
              return clonedRes.json();
            })
            .then(function (data: { [x: string]: any }) {
              for (let key in data) {
                writeData("posts", data[key]);
              }
            });

        return res;
      })
    );
  } else if (
    // (new RegExp("\\b" + STATIC_FILES.join("\\b|\\b") + "\\b").test(event.request.url))
    isInArray(event.request.url, STATIC_FILES)
  ) {
    (event as any).respondWith(caches.match(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
                // trimCache(CACHE_DYNAMIC_NAME, 3);
                cache.put(event.request.url, res.clone());
                return res as any;
              });
            })
            .catch(function (err) {
              console.log("err:", err);
              return caches.open(CACHE_STATIC_NAME).then(function (cache) {
                // if (event.request.url.indexOf("/help")) {
                //   return cache.match("/offline.html");
                // }
                if (event.request.headers.get("accept")?.includes("text/html")) {
                  return cache.match("/offline.html");
                }
              });
            });
        }
      })
    );
  }
});

//* Cache then Network & Dynamic Caching / Cache then Network with Offline Support for one url -> very useful!!!
// (self as unknown as ServiceWorkerGlobalScope).addEventListener("fetch", function (event: FetchEvent) {
//   const url = "https://httpbin.org/get";

//   if (event.request.url.indexOf(url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_DYNAMIC_NAME).then(function (cache: Cache) {
//         return fetch(event.request).then(function (res: Response) {
//           cache.put(event.request, res.clone());
//           return res;
//         });
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request).then(function (response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function (res) {
//               return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
//                 cache.put(event.request.url, res.clone());
//                 return res as any;
//               });
//             })
//             .catch(function (err) {
//               console.log("err:", err);
//               return caches.open(CACHE_STATIC_NAME).then(function (cache) {
//                 return cache.match("/offline.html");
//               });
//             });
//         }
//       })
//     );
//   }
// });

//* Cache then Network Strategy!
// (self as unknown as ServiceWorkerGlobalScope).addEventListener("fetch", function (event: FetchEvent) {
//   event.respondWith(
//     caches.match(event.request).then(function (response: Response | undefined) {
//       if (response) {
//         return response;
//       } else {
//         return fetch(event.request)
//           .then(function (res: Response) {
//             return caches.open(CACHE_DYNAMIC_NAME).then(function (cache: Cache) {
//               cache.put(event.request.url, res.clone());
//               return res as any;
//             });
//           })
//           .catch(function (err: Error) {
//             console.log("err:", err);
//             return caches.open(CACHE_STATIC_NAME).then(function (cache: Cache) {
//               return cache.match("/offline.html");
//             });
//           });
//       }
//     })
//   );
// });

//* Cache-only strategy: not good!
// (self as unknown as ServiceWorkerGlobalScope).addEventListener("fetch", function (event: FetchEvent) {
//   (event as any).respondWith(caches.match(event.request));
// });

//* Network-only strategy: not good!
// (self as unknown as ServiceWorkerGlobalScope).addEventListener("fetch", function (event: FetchEvent) {
//   event.respondWith(fetch(event.request));
// });

//* Network with Cache Fallback Strategy
// (self as unknown as ServiceWorkerGlobalScope).addEventListener("fetch", function (event: FetchEvent) {
//   event.respondWith(
//     fetch(event.request)
//       .then(function (res: Response) {
//         return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
//           cache.put(event.request.url, res.clone());
//           return res as any;
//         });
//       })
//       .catch(function (err) {
//         console.log("err:", err);
//         return caches.match(event.request);
//       })
//   );
// });

// @ts-ignore
(self as any).addEventListener("sync", function (event: SyncEvent) {
  const { readAllData, deleteItemFromData } = typeof window !== "undefined" && (window as any); //* Doesn't work!

  console.log("[Service Worker] Background syncing", event);
  if (event.tag === "sync-new-posts") {
    console.log("[Service Worker] Syncing new Posts");
    event.waitUntil(
      readAllData("sync-posts").then(function (data: any) {
        for (let dt of data) {
          // Temp
          fetch("Temp Url", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              id: dt.id,
              title: dt.title,
              location: dt.location,
              image: "Image URL", // Temp
            }),
          })
            .then(function (res) {
              console.log("Sent data", res);
              if (res.ok) {
                if (res.ok) {
                  res.json().then(function (resData) {
                    deleteItemFromData("sync-posts", resData.id);
                  });
                }
              }
            })
            .catch(function (err) {
              console.log("Error while sending data", err);
            });
        }
      })
    );
  }
});
