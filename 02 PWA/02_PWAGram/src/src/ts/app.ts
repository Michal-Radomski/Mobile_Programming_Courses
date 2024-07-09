if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js", { scope: "." }).then(function (): void {
    console.log("Service worker registered!");
  });
}
