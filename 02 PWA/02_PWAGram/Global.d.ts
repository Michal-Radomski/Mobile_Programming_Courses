declare global {
  interface Window {
    clients: { claim: () => void };
  }
  interface CustomEvent extends Event {
    respondWith?(arg0: unknown): unknown;
    request?: string | URL | Request;
  }
}

export {};
