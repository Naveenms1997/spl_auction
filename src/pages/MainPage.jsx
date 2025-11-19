import React from "react";
import { useAppContext } from "../context/GlobalContext";

export default function MainPage() {
  const { state, updateState } = useAppContext();

  return (
    <div>
      <h2>Main Window</h2>

      <input
        placeholder="Player name"
        value={state.player}
        onChange={(e) => updateState({ player: e.target.value })}
      />

      <input
        type="number"
        placeholder="Amount"
        value={state.amount}
        onChange={(e) => updateState({ amount: Number(e.target.value) })}
      />

      <button onClick={() => window.electronAPI.send("open-second-window")}>
        Open Second Window
      </button>
    </div>
  );
}
