import React from "react";
import { useAppContext } from "../context/GlobalContext";
import AudienceScreen from "./AudienceScreen";
import { Box } from "@mui/material";
export default function SecondPage() {
  const { state } = useAppContext();
  return (
    <Box>
      <AudienceScreen />
    </Box>
    // <div>
    //   <h2>Second Window</h2> <p>Player: {state?.player}</p>{" "}
    //   <p>Amount: {state?.amount}</p>{" "}
    // </div>
  );
}
