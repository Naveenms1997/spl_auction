import { createContext, useContext, useState, useEffect } from "react";
import players from "../data/players.json";
import teams from "../data/teams.json";

const GlobalContext = createContext();
// const ongoingAuction = {
//   player:players[0], // full player data
//   currentBiddingTeam:null, // or team
//   currentBidAmount:null, // will start with base price,
// }

const initialState = {
  ongoingAuction: null,
  players: players,
  teams: teams,
  basePrice: 50,
  availablePlayers: players,
  unsoldPlayers: [],
  soldPlayers: [],
};

export function GlobalProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem("globalState");
    return saved ? JSON.parse(saved) : initialState;
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
    console.log(">>>",newValues);
    setState((prev) => {
      const updated = { ...prev, ...newValues };
      // Save to main process for other windows
      

      window.electronAPI?.send("context-update", updated);
      return updated;
    });
  };

  const resetGlobalState = () => {
    setState(initialState);
  };

  return (
    <GlobalContext.Provider value={{ state, updateState, resetGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}

export const useAppContext = () => useContext(GlobalContext);
