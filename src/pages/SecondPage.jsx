import React from "react";
import { useAppContext } from "../context/GlobalContext";
export default function SecondPage() {
  const { state } = useAppContext();
  return (
    <div>
      <h2>Second Window</h2> <p>Player: {state.player}</p>{" "}
      <p>Amount: {state.amount}</p>{" "}
    </div>
  );
}
