import React from "react";

export function useStoredState(storageKey: string, defaultState: string): [string, Function] {
  function getInitialState() {
    const storedState = localStorage.getItem(storageKey);
    return storedState ?? defaultState;
  }

  const [state, setState] = React.useState(getInitialState);

  function setAndStoreState(state: string) {
    setState(state);
    localStorage.setItem(storageKey, state);
  }
  return [state, setAndStoreState];
}
