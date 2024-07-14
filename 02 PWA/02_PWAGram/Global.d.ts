/// <reference lib="webworker" />

declare global {
  interface Window {
    clients: { claim: () => void };
    componentHandler: { upgradeElement: Function };
    idb: IDBFactory | any;
    writeData: Function;
    clearAllData: Function;
    FB_URL: string;
  }
}

declare const self: ServiceWorkerGlobalScope;

export {};
