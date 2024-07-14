/// <reference lib="webworker" />

declare global {
  interface Window {
    clients: { claim: () => void };
    componentHandler: { upgradeElement: Function };
    idb: IDBFactory | any;
    writeData: Function;
    clearAllData: Function;
  }
}

declare const self: ServiceWorkerGlobalScope;

export {};
