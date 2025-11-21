import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { shuffleArray } from "../utils/shuffle";
import mysteryCard from "../assets/images/mysteryCard2.png";
import { useAppContext } from "../context/GlobalContext";

function ChoosePlayer() {
  const { state, updateState } = useAppContext();
  const { availablePlayers } = state || {};

  const selectPlayerForAuction = (player) => {
    updateState({
      ongoingAuction: {
        player: player,
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
              key={player.id}
              sx={{
                borderRadius: "8px",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "scale(1.02)", // slight zoom
                  boxShadow: "0px 4px 10px rgba(32, 192, 69, 0.72)", // optional pop shadow
                  zIndex: 10, // ensures it comes above others
                },
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
