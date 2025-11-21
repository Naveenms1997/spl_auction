import React from "react";
import { useAppContext } from "../context/GlobalContext";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import BiddingCardAdmin from "../components/BiddingCardAdmin";
import ChoosePlayer from "../components/ChoosePlayer";

export default function AdminPage() {
  const { state, updateState, resetGlobalState } = useAppContext();
  const { ongoingAuction , eventStatus, } = state || {};

  const chooseNextPlayer = ()=>{
    updateState({
      eventStatus: "NEXT_PLAYER",
    })
  }

  return (
    <Box padding={4}>
      <Stack
        direction="row"
        spacing={4}
        justifyContent={"space-between"}
        mb={4}
      >
        <Card
          sx={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)", // soft shadow
            padding: 4,
            width: "50%",
            borderRadius: 4,
          }}
        >
          <Stack direction={"column"} spacing={2} justifyContent={"flex-start"}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={chooseNextPlayer}
                disabled={!ongoingAuction?.isSold && !ongoingAuction?.isUnsold}
              >
                Choose Next Player
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetGlobalState}
              >
                RESET
              </Button>
            </Stack>
            {eventStatus === "NEXT_PLAYER" ? (
              <ChoosePlayer />
            ) : (
              <BiddingCardAdmin player={ongoingAuction?.player} />
            )}
          </Stack>
        </Card>

        {/* AUDIENCE SCREEN ACTION */}
        <Card
          sx={{
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // soft shadow
            padding: 4,
            width: "20%",
          }}
        >
          <Stack>
            <Stack
              direction={"column"}
              spacing={2}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
            >
              <Stack
                sx={{
                  backgroundColor: "#68e26eb6",
                  width: "100%",
                  alignItems: "center",
                  color: "#000",
                }}
              >
                <Typography variant="h6">Audience Screen Pages</Typography>
              </Stack>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="stretch" // ensures full width
                width={"100%"}
              >
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      window.electronAPI.send("open-second-window")
                    }
                  >
                    Open Second Window
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
