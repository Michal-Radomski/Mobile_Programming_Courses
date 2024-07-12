declare global {
  interface Window {
    clients: { claim: () => void };
    componentHandler: Function;
  }
  interface CustomEvent extends Event {
    waitUntil: Function;
  }
}

export {};
