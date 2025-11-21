import { Avatar, Box, Card, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { getImageUrl } from "../utils/images";

function TeamSquad({ team }) {
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
          <img
            src={getImageUrl(team?.logo)}
            alt="icon"
            style={{ width: 40, height: 40 }}
          />
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
        {team?.selectedPlayers.map((player, i) => {
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
                avatar={
                  <Avatar alt={player.name} src={getImageUrl(player.photo)} />
                }
                label={
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {player.name}
                  </Typography>
                }
                sx={{
                  backgroundColor: "#d6d6d694",
                  color: "#000",
                  fontWeight: "bold",
                  border: "1px solid #161d15b5",
                  width: "100%",
                  justifyContent: "flex-start",
                  pl: 1,
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
