declare global {
  interface Window {
    clients: { claim: () => void };
    componentHandler: any;
    sharedMomentsArea: any;
  }
}

export {};
