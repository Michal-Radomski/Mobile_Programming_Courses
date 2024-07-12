/// <reference lib="webworker" />

declare global {
  interface Window {
    clients: { claim: () => void };
    componentHandler: Function;
  }
}

declare const self: ServiceWorkerGlobalScope;

export {};
