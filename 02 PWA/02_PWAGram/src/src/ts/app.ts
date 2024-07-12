//* https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}

// * Check if browser has Promise, if not use polyfills!
if (!window.Promise) {
  window.Promise = Promise;
}

let deferredPrompt: BeforeInstallPromptEvent | null;

if ("serviceWorker" in navigator) {
  (navigator as Navigator).serviceWorker.register("/sw.js", { scope: "." }).then(function (): void {
    console.log("Service worker registered!");
  });
}

(window as any).addEventListener("beforeinstallprompt", function (event: BeforeInstallPromptEvent) {
  // console.log("beforeinstallprompt fired");
  event.preventDefault();
  deferredPrompt = event;
  // console.log("deferredPrompt:", deferredPrompt);
  return false;
});

//* Unregister serviceWorker
// navigator.serviceWorker.getRegistrations().then(function (registrations) {
//   for (let registration of registrations) {
//     registration.unregister();
//   }
// });

//@ Refresher
//* Async JS
// setTimeout(() => {
//   console.log(1, "setTimeout");
// }, 2000);

// console.log(2, "After setTimeout");

// const promise = new Promise<string>(function (_resolve, _reject): void {
//   setTimeout(() => {
//     _resolve("setTimeout");
//     // _reject("reject");
//   }, 2000);
// }) as Promise<string>;

// // promise.then((text) => console.log(text));
// promise
//   .then((text: string) => {
//     return text;
//   })
//   .then((newText: string) => {
//     return newText;
//   })
//   .then((newText2: string) => console.log({ newText2 }))
//   .catch((err: Error) => console.log({ err }));

//* Fetch API
// fetch("https://httpbin.org/ip")
//   .then((data) => {
//     console.log("data:", data);
//     return data.json();
//   })
//   .then((res) => console.log("res:", res))
//   .catch((err: Error) => console.log("err:", err));

// const data = {
//   key1: "value1",
//   key2: "value2",
// };

// fetch("https://httpbin.org/post", {
//   method: "POST",
//   headers: { "Content-Type": "application/json", Accept: "application/json" },
//   mode: "cors",
//   body: JSON.stringify(data),
// })
//   .then((data) => {
//     // console.log("data:", data);
//     return data.json();
//   })
//   .then((res) => console.log("res:", res))
//   .catch((err: Error) => console.log("err:", err));

//* AJAX
// const xhr = new XMLHttpRequest();
// xhr.open("GET", "https://httpbin.org/ip");
// xhr.responseType = "json";

// xhr.onload = function (): void {
//   console.log("xhr.response:", xhr.response);
// };

// xhr.onerror = function (): void {
//   console.log("Error!");
// };

// xhr.send();

//* Fetch with async/await
// (async function getData() {
//   const url = "https://httpbin.org/ip";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log({ json });
//   } catch (error) {
//     console.error("(error as Error).message:", (error as Error).message);
//   }
// })();

// (function getData(): void {
//   new Promise(function (resolve, _reject) {
//     setTimeout(function () {
//       resolve("https://httpbin.org/get");
//     }, 1000);
//   })
//     .then(function (url) {
//       // console.log({ url });
//       return fetch(url as string, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });
//     })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log("data.origin:", data.origin);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// })();
