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
  interface ServiceWorkerRegistration {
    readonly sync: SyncManager;
  }

  interface SyncEvent extends ExtendableEvent {
    readonly lastChance: boolean;
    readonly tag: string;
  }

  interface ServiceWorkerGlobalScopeEventMap {
    sync: SyncEvent;
  }
}

interface SyncManager {
  getTags(): Promise<string[]>;
  register(tag: string): Promise<void>;
}

declare const self: ServiceWorkerGlobalScope;

export {};
