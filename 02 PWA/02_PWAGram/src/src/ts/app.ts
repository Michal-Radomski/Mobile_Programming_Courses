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
