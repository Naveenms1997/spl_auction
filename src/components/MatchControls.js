import React from "react";

export default function MatchControls({ onAdd, onSave, onOpenScoreboard }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button onClick={onAdd}>Add Dummy Result</button>
      <button onClick={onSave}>Save Excel</button>
      <button onClick={onOpenScoreboard}>Open Scoreboard</button>
    </div>
  );
}
