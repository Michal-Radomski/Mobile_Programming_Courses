declare global {
  interface Window {
    clients: { claim: () => void };
    componentHandler: any;
    sharedMomentsArea: any;
  }
  interface CustomEvent extends Event {
    waitUntil: Function;
  }
}

export {};
