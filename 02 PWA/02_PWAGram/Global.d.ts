declare global {
  interface Window {
    clients: { claim: () => void };
  }
}

export {};
