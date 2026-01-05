import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { shuffleArray } from "../utils/shuffle";
import { mysteryCard } from "../assets/index";
import { useAppContext } from "../context/GlobalContext";

function ChoosePlayer() {
  const { state, updateState, getPlayerData } = useAppContext();
  const { availablePlayers } = state || {};

  const selectPlayerForAuction = (player) => {
    const playerData = getPlayerData(player);
    updateState({
      ongoingAuction: {
        player: playerData,
        currentBiddingTeam: null,
        currentBidAmount: null,
      },
      eventStatus: "ONGOING",
    });
  };

  return (
    <Stack spacing={2}>
      <Stack padding={2} alignItems={"center"} backgroundColor={"#da8f56ff"}>
        <Typography variant="h5">Choose Player For Auction</Typography>
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(45px, 1fr))",
            gap: 1,
            width: "100%",
            height: "100%",
          }}
        >
          {shuffleArray(availablePlayers).map((player) => (
            <Box
              key={player}
              sx={{
                borderRadius: "8px",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "scale(1.15)",
                  boxShadow: "1px 0px 1px 3px rgba(40, 40, 41, 0.34)",
                  zIndex: 10,
                },
                width: "45px",
              }}
              onClick={() => selectPlayerForAuction(player)}
            >
              <img
                src={mysteryCard}
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

export default ChoosePlayer;
