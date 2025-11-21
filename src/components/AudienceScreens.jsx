import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import GavelIcon from "@mui/icons-material/Gavel";
import { useAppContext } from "../context/GlobalContext";

function AudienceScreens() {
  const { state, updateState } = useAppContext();
  const { audienceScreen, ongoingAuction } = state || {};

  const setAudienceScreenView = (view) => {
    updateState({
      audienceScreen: view,
      ongoingAuction: { ...ongoingAuction, playSoundAnime: false },
    });
  };
  return (
    <Card
      sx={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // soft shadow
        padding: 4,
        // width: "20%",
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
                onClick={() => window.electronAPI.send("open-second-window")}
              >
                Open Second Window
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant={audienceScreen === "TEAMS" ? "contained" : "outlined"}
                color="warning"
                onClick={() => {
                  setAudienceScreenView("TEAMS");
                }}
                startIcon={<GroupsIcon />}
              >
                Teams Squad
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant={
                  audienceScreen === "AUCTION_PANEL" ? "contained" : "outlined"
                }
                color="warning"
                startIcon={<GavelIcon />}
                onClick={() => {
                  setAudienceScreenView("AUCTION_PANEL");
                }}
              >
                Auction Panel
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Card>
  );
}

export default AudienceScreens;
