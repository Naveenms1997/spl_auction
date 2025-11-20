import React from "react";
import { useAppContext } from "../context/GlobalContext";
import { Box, Button, Stack, TextField } from "@mui/material";
import backgroundImg from "../assets/images/blue_abstract_lines_2.jpg";

export default function MainPage() {
  const { state, updateState } = useAppContext();

  const resetState = () => {
    updateState({ player: "", amount: 0 });
  };
  return (
    <Box
      padding={4}
    >
      <Stack spacing={2} direction="column" sx={{ width: 300}}>
        <TextField
          label="Player Name"
          variant="outlined"
          value={state.player}
          onChange={(e) => updateState({ player: e.target.value })}
        />
        <TextField
          label="Amount"
          type="number"
          variant="outlined"
          value={state.amount}
          onChange={(e) => updateState({ amount: Number(e.target.value) })}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => window.electronAPI.send("open-second-window")}
        >
          Open Second Window
        </Button>
         <Button
          variant="outlined"
          color="secondary"
          onClick={resetState}
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
