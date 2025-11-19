import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, setState] = useState({
    player: "",
    amount: 0
  });

  // -----------------------
  // SEND UPDATES TO MAIN
  // -----------------------
  const updateState = (newValues) => {
    setState((prev) => {
      const updated = { ...prev, ...newValues };
      window.electronAPI?.send("context-update", updated);
      return updated;
    });
  };

  // -----------------------
  // RECEIVE UPDATES FROM MAIN (sync across windows)
  // -----------------------
  useEffect(() => {
    if (!window.electronAPI) return;

    window.electronAPI.receive("context-update", (newState) => {
      setState(newState);
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, updateState }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
