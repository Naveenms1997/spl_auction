import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { getImageUrl } from "../utils/images";
import { useAppContext } from "../context/GlobalContext";
import mysteryCard from "../assets/images/mysteryCard2.png";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import GavelIcon from "@mui/icons-material/Gavel";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

function shuffleArray(array) {
  const arr = [...array]; // avoid mutating original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}

const getBidStepAmount = (amount) => {
  if (amount < 100) return 10;
  if (amount < 200) return 20;
  if (amount < 500) return 30;
  if (amount < 2000) return 50;
  return 100;
};

const getBidPointerAmount = (amount) => {
  if (amount < 100) return 50;
  if (amount < 200) return 100;
  if (amount < 500) return 200;
  if (amount < 2000) return 500;
  return 2000;
};

const getNextBidAmount = (currentAmount) => {
  return currentAmount + getBidStepAmount(currentAmount);
};

function BiddingCardAdmin({ player }) {
  const { state, updateState, resetGlobalState } = useAppContext();
  const {
    ongoingAuction,
    basePrice,
    players,
    teams,
    availablePlayers,
    auctionRules,
  } = state || {};

  const selectPlayerForAuction = (player) => {
    updateState({
      ongoingAuction: {
        player: player,
        currentBiddingTeam: null,
        currentBidAmount: null,
      },
      // auctionStatus: "ONGOING",
    });
  };

  const applyBidToTeam = (team) => {
    if (team.id === ongoingAuction?.currentBiddingTeam?.id) {
      return; // no change
    }
    const nextBidAmount =
      ongoingAuction.currentBidAmount !== null
        ? getNextBidAmount(ongoingAuction.currentBidAmount)
        : basePrice;
    if (nextBidAmount <= team.maxBidPerPlayer) {
      updateState({
        ongoingAuction: {
          ...ongoingAuction,
          player: { ...ongoingAuction.player, currentBid: nextBidAmount },
          currentBiddingTeam: team,
          currentBidAmount: nextBidAmount,
        },
      });
    } else {
      alert(`Bid exceeds ${team.name}'s maximum bid limit!`);
    }
  };

  const soldPlayerToTeam = () => {
    const boughtTeam = ongoingAuction.currentBiddingTeam;
    const budgetLeftAfterBid =
      boughtTeam.budgetLeft - ongoingAuction.currentBidAmount;
    const requiuredPlayersAfterBid = boughtTeam.requiuredPlayers - 1;

    const budgetForBasePricePurchase =
      (requiuredPlayersAfterBid - 1) * basePrice;
    const budgetAfterBasePricePurchase =
      budgetLeftAfterBid - budgetForBasePricePurchase;

    const lowerBidPointerValue = getBidPointerAmount(
      budgetAfterBasePricePurchase
    );
    const valueToGetReminder =
      budgetAfterBasePricePurchase - lowerBidPointerValue;
    const bidStepAmount = getBidStepAmount(budgetAfterBasePricePurchase);
    const reminderValue = valueToGetReminder % bidStepAmount;
    const finalMaxBidPerPlayer = budgetAfterBasePricePurchase - reminderValue;

    const updatedPlayer = {
      ...ongoingAuction.player,
      finalBidAmount: ongoingAuction.currentBidAmount,
      team: boughtTeam,
      currentBid: null,
      bidResult: "SOLD",
    };

    const updatedTeam = {
      ...boughtTeam,
      budgetLeft: budgetLeftAfterBid,
      totalSpent: boughtTeam.totalSpent + ongoingAuction.currentBidAmount,
      playersBought: boughtTeam.playersBought + 1,
      requiuredPlayers: requiuredPlayersAfterBid,
      maxBidPerPlayer: finalMaxBidPerPlayer,
      selectedPlayers: [...boughtTeam.selectedPlayers, updatedPlayer],
    };

    updateState({
      ongoingAuction: { ...ongoingAuction, isSold: true, playSoundAnime: true },
      players: players.map((p) =>
        p.id === updatedPlayer.id ? updatedPlayer : p
      ),
      teams: teams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t)),
      soldPlayers: [...state.soldPlayers, updatedPlayer],
      availablePlayers: state.availablePlayers.filter(
        (p) => p.id !== updatedPlayer.id
      ),
      isSold: true,
    });
  };

  const unsoldPlayer = () => {
    const updatedPlayer = {
      ...ongoingAuction.player,
      bidResult: "UNSOLD",
    };

    updateState({
      ongoingAuction: {
        ...ongoingAuction,
        isUnsold: true,
        playSoundAnime: true,
      },
      players: players.map((p) =>
        p.id === updatedPlayer.id ? updatedPlayer : p
      ),
      availablePlayers: state.availablePlayers.filter(
        (p) => p.id !== updatedPlayer.id
      ),
      unsoldPlayers: [...state.unsoldPlayers, updatedPlayer],
      isUnsold: true,
    });
  };

  const restartBid = () => {
    const updatedPlayer = {
      ...ongoingAuction.player,
      team: null,
      currentBid: null,
      finalBidAmount: null,
      bidResult: "AVAILABLE",
    };

    if (ongoingAuction?.isSold) {
      const updatedTeam = ongoingAuction.currentBiddingTeam;
      updateState({
        ongoingAuction: {
          ...ongoingAuction,
          player: {
            ...updatedPlayer,
          },
          isSold: false,
          isUnsold: false,
          currentBidAmount: null,
          currentBiddingTeam: null,
        },
        teams: teams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t)),
        soldPlayers: state.soldPlayers.filter((p) => p.id !== updatedPlayer.id),
        availablePlayers: [...state.availablePlayers, updatedPlayer],
      });
    } else {
      updateState({
        ongoingAuction: {
          ...ongoingAuction,
          player: {
            ...ongoingAuction.player,
            team: null,
            currentBid: null,
            bidResult: "AVAILABLE",
          },
          isSold: false,
          isUnsold: false,
          currentBidAmount: null,
          currentBiddingTeam: null,
        },
        unsoldPlayers: state.unsoldPlayers.filter(
          (p) => p.id !== updatedPlayer.id
        ),
        availablePlayers: [...state.availablePlayers, updatedPlayer],
      });
    }
  };

  return player ? (
    <Stack spacing={2} direction="column">
      {/* Player info card starts */}
      <Card
        sx={{
          display: "flex",
          minHeight: 150,
          // alignItems: "center",
          boxSizing: "border-box",
          boxShadow: () => {
            if (ongoingAuction?.isSold) {
              return "0 4px 20px #12ed3af9";
            } else if (ongoingAuction?.isUnsold) {
              return "0 4px 20px #de3232f9";
            } else {
              return "0 4px 20px rgba(0, 0, 0, 0.2)";
            }
          },
          justifyContent: "flex-start",
        }}
      >
        <Box sx={{ marginRight: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 150, height: "100%", objectFit: "contain" }}
            image={getImageUrl(player.photo)}
            alt="Live from space album cover"
          />
        </Box>
        <Box sx={{ flexDirection: "column", width: "100%" }} padding={2}>
          <Stack
            sx={{ width: "100%" }}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack spacing={2}>
              <Typography variant="h3">{player.name}</Typography>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography variant="h5">Current Bid : </Typography>
                <Typography variant="h4">
                  {ongoingAuction.currentBidAmount !== null
                    ? ongoingAuction.currentBidAmount
                    : "....."}
                </Typography>
              </Stack>
            </Stack>
            <Stack paddingRight={2}>
              <Grid
                container
                spacing={2}
                direction="column"
                alignItems="stretch" // ensures full width
              >
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    startIcon={<GavelIcon />}
                    onClick={soldPlayerToTeam}
                    disabled={
                      !ongoingAuction?.currentBiddingTeam ||
                      ongoingAuction?.isSold ||
                      ongoingAuction?.isUnsold
                    }
                  >
                    SOLD
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DoNotDisturbAltIcon />}
                    onClick={unsoldPlayer}
                    disabled={
                      !!ongoingAuction?.currentBiddingTeam ||
                      ongoingAuction?.isUnsold ||
                      ongoingAuction?.isSold
                    }
                  >
                    UNSOLD
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="info"
                    startIcon={<RotateLeftIcon />}
                    onClick={restartBid}
                  >
                    Restart
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Box>
      </Card>
      {/* Player info card ends */}

      {/* Auction card starts */}
      <Card
        sx={{
          display: "flex",
          minHeight: 150,
          boxSizing: "border-box",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // soft shadow
          justifyContent: "flex-start",
          padding: 2,
        }}
      >
        <Stack spacing={2} direction="column">
          <Grid container spacing={2}>
            {teams.map((team) => {
              const isDisabled =
                team.playersBought === auctionRules?.maxPlayersPerTeam ||
                ongoingAuction?.isUnsold ||
                (ongoingAuction?.isSold &&
                  ongoingAuction?.currentBiddingTeam.id !== team.id);
              return (
                <Grid size={4} key={team.id} item sm={4}>
                  <Card
                    sx={{
                      position: "relative",
                      opacity: isDisabled ? 0.6 : 1,
                      pointerEvents: isDisabled ? "none" : "auto",

                      boxShadow: "0 4px 5px rgba(0, 0, 0, 0.1)",
                      border:
                        ongoingAuction?.currentBiddingTeam?.id === team.id
                          ? "1px solid #12ed3af9"
                          : "1px solid #7a777797",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      "&:hover": {
                        // transform: "scale(1.05)",
                        transform: isDisabled ? "none" : "scale(1.05)",
                      },

                      // Overlay
                      ...(isDisabled && {
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "rgba(0,0,0,0.35)",
                          backdropFilter: "blur(1px)",
                          borderRadius: "inherit",
                        },
                      }),
                    }}
                    onClick={() => applyBidToTeam(team)}
                  >
                    <Stack
                      direction={"column"}
                      alignItems="center"
                      spacing={2}
                      justifyContent={"space-between"}
                    >
                      <Box padding={2}>
                        <img
                          src={getImageUrl(team.logo)}
                          alt="icon"
                          style={{ width: 100, height: 100 }}
                        />
                      </Box>
                      <Stack
                        sx={{
                          backgroundColor:
                            ongoingAuction?.currentBiddingTeam?.id === team.id
                              ? "#12ed3af9"
                              : "#a29f9f78",
                          width: "100%",
                          alignItems: "center",
                          color: "#000",
                        }}
                      >
                        <Typography variant="subtitle1" paddingX={1}>
                          {team.name}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Card>
      {/* Auction card ends */}
    </Stack>
  ) : (
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

export default BiddingCardAdmin;
