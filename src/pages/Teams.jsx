import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import TextInfo from "../components/TextDetail";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import GavelIcon from "@mui/icons-material/Gavel";
import HailIcon from "@mui/icons-material/Hail";
import { useAppContext } from "../context/GlobalContext";
import TeamSquad from "../components/TeamSquad";

function Teams() {
  const { state } = useAppContext();
  const {
    ongoingAuction,
    teams,
    eventStatus,
    players,
    soldPlayers,
    unsoldPlayers,
    availablePlayers,
    audienceScreen,
  } = state || {};

  const getHighestBid = () => {
    if (soldPlayers?.length) {
      const highestBidPlayer = soldPlayers?.reduce((max, player) =>
        player.finalBidAmount > max.finalBidAmount ? player : max
      );
      return highestBidPlayer;
    }
  };
  return (
    <Box sx={{ padding: 2, height: "100%" }}>
      <Stack spacing={2}>
        <Card
          sx={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // soft shadow
            borderRadius: 2,
          }}
        >
          <Stack
            direction={"column"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            <Stack
              padding={2}
              backgroundColor={"#ef9103ff"}
              width={"100%"}
              alignItems={"center"}
            >
              <Typography variant="h5">Auction Summary</Typography>
            </Stack>

            <Stack
              direction={"row"}
              width={"100%"}
              alignItems={"flex-start"}
              justifyContent={"space-evenly"}
              padding={2}
            >
              <Chip
                label={`Remaining Players : ${availablePlayers?.length || 0}`}
                variant="filled"
                color="success"
                icon={<GroupAddRoundedIcon />}
              />
              <Chip
                label={`Sold Players : ${soldPlayers?.length || 0}`}
                variant="filled"
                color="success"
                icon={<GavelIcon />}
              />
              <Chip
                label={`Unsold Players : ${unsoldPlayers?.length || 0}`}
                variant="outlined"
                color="error"
                icon={<DoNotDisturbAltIcon />}
              />
            </Stack>
          </Stack>
        </Card>

        <Stack direction={"column"} spacing={1} justifyContent={"flex-start"}>
          <Stack
            padding={1}
            backgroundColor={"#0814f0ff"}
            alignItems={"center"}
            borderRadius={2}
          >
            <Typography variant="h6" color="#fff">
              TEAMS SQUAD
            </Typography>
          </Stack>

          <Stack
            spacing={2}
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            {teams?.map((team) => {
              return <TeamSquad key={team.id} team={team} />;
            })}
          </Stack>
        </Stack>
        
      </Stack>
    </Box>
  );
}

export default Teams;
