import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("globalState");
    return saved
      ? JSON.parse(saved)
      : { player: "", amount: 0 };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("globalState", JSON.stringify(state));
  }, [state]);

  // Listen to "storage" event for cross-tab/window updates (fallback)
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "globalState") {
        setState(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Listen to updates from main process via IPC
  useEffect(() => {
    const listener = (_, newState) => {
      setState(newState);
    };

    window.electronAPI?.receive("context-update", listener);

    return () => {
      window.electronAPI?.removeListener?.("context-update", listener);
    };
  }, []);

  const updateState = (newValues) => {
    setState((prev) => {
      const updated = { ...prev, ...newValues };
      // Save to main process for other windows
      window.electronAPI?.send("context-update", updated);
      return updated;
    });
  };

  return (
    <GlobalContext.Provider value={{ state, updateState }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}

export const useAppContext = () => useContext(GlobalContext);
