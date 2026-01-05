import { Avatar, Box, Card, Chip, Stack, Typography } from "@mui/material";
import { useAppContext } from "../context/GlobalContext";

function TeamSquad({ team }) {
  const { state } = useAppContext();
  const { players } = state || {};

  const selectedPlayers = team.selectedPlayers.map((id) => {
    const playerInfo = players.find((p) => p.id === id);
    return playerInfo;
  });

  return (
    <Card
      sx={{
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // soft shadow
        borderRadius: 2,
        width: "100%",
      }}
    >
      <Stack
        backgroundColor={"#129c9599"}
        width={"100%"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
      >
        <Stack padding={0.5}>
          <img src={team?.logo} alt="icon" style={{ width: 40, height: 40 }} />
        </Stack>
        <Typography variant="h6" color="#000">
          {team.name}
        </Typography>
      </Stack>

      <Stack
        direction={"column"}
        spacing={1}
        padding={2}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
      >
        {(
          [
            ...(selectedPlayers || []),
            ...Array(15 - (selectedPlayers.length || 0)).fill(null),
          ] || []
        ).map((player, i) => {
          return (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              spacing={1}
              width={"100%"}
            >
              <Typography variant="subtitle1">{`${i + 1}.`}</Typography>
              <Chip
                label={
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {player ? player.name : ""}
                  </Typography>
                }
                sx={{
                  backgroundColor: player ? "#d6d6d694" : "#ebeaea4d",
                  color: "#000",
                  fontWeight: "bold",
                  border: player
                    ? "1px solid #161d15b5"
                    : "1px solid #242b2222",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              />
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
}

export default TeamSquad;
