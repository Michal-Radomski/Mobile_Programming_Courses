/// <reference lib="webworker" />

declare global {
  interface Window {
    clients: { claim: () => void };
    componentHandler: { upgradeElement: Function };
  }
}

declare const self: ServiceWorkerGlobalScope;

export {};
