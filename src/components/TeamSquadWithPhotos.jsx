import { useEffect, useState } from "react";
import { useAppContext } from "../context/GlobalContext";
import { Box, Card, Grid, Stack } from "@mui/material";
import TeamsCardBiddingPanel from "./TeamsCardBiddingPanel";
import ImageCard from "./PlayersPhoto";
import { mysteryPlayer } from "../assets";

function TeamSquadWithPhotos() {
  const { state } = useAppContext();
  const { audienceScreen, teams, players } = state || {};
  const [selectedTeam, setSelectedTeam] = useState(null);

  const selectedPlayers = selectedTeam?.selectedPlayers.map((id) => {
    const playerInfo = players.find((p) => p.id === id);
    return playerInfo;
  });

  useEffect(() => {
    if (teams) {
      const teamData = teams.find((t) => t.id === audienceScreen);
      setSelectedTeam(teamData);
    }
  }, [teams]);

  return (
    <Box sx={{ padding: 2, height: "100%" }}>
      <Stack spacing={1}>
        {selectedTeam ? (
          <TeamsCardBiddingPanel
            sx={{
              minHeight: 120,
              borderRadius: 2,
            }}
            team={selectedTeam}
          />
        ) : null}

        <Stack justifyContent={"center"} alignItems={"center"} width={"100%"}>
          <Card
            sx={{
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // soft shadow
              borderRadius: 2,
              backgroundColor: "#837e7e9b",
              padding: 1,
              width: "80%",
            }}
          >
            {/* // Decrese columnSpacing to support more images */}
            <Grid
              container
              rowSpacing={2}
              columnSpacing={6}
              width={"100%"}
              justifyContent={"center"}
            >
              {(selectedPlayers || []).slice(0, 15).map((player) => (
                <Grid
                  item
                  key={player.id}
                  display="flex"
                  justifyContent="center"
                >
                  <ImageCard
                    image={player?.photo || mysteryPlayer}
                    name={player?.name}
                    bidAmount={player?.finalBidAmount}
                    specialBorder={player?.isOwner || player?.isIconPlayer}
                  />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TeamSquadWithPhotos;
