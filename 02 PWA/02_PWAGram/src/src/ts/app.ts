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

let deferredPrompt: BeforeInstallPromptEvent | null;

if ("serviceWorker" in navigator) {
  (navigator as Navigator).serviceWorker.register("/sw.js", { scope: "." }).then(function (): void {
    console.log("Service worker registered!");
  });
}

(window as any).addEventListener("beforeinstallprompt", function (event: BeforeInstallPromptEvent) {
  console.log("beforeinstallprompt fired");
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
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://httpbin.org/ip");
xhr.responseType = "json";

xhr.onload = function (): void {
  console.log("xhr.response:", xhr.response);
};

xhr.onerror = function (): void {
  console.log("Error!");
};

xhr.send();
