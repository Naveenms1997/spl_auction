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
        backgroundColor={"#0e1027ff"}
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
        <Typography variant="h6" color="#fff">
          {team.name}
        </Typography>
      </Stack>

      <Stack
        direction={"column"}
        spacing={1}
        padding={1}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        paddingLeft={2}
      >
        {team?.selectedPlayers.map((player, i) => {
          return (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              spacing={1}
            >
              <Typography variant="subtitle1">{`${i + 1}.`}</Typography>
              <Chip
                avatar={
                  <Avatar alt={player.name} src={getImageUrl(player.photo)} />
                }
                label={player.name}
                sx={{
                  backgroundColor: "#d6d6d694",
                  color: "#000",
                  fontWeight: "bold",
                  border: "1px solid #161d15b5",
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
