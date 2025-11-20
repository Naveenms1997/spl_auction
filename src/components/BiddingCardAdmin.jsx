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
// import teams from "../data/teams.json";
// import players from "../data/players.json";
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
  console.log("????",arr.length);
  
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
  const { ongoingAuction, basePrice, players, teams, availablePlayers } =
    state || {};

  const selectPlayerForAuction = (player) => {
    updateState({
      ongoingAuction: {
        player: player,
        currentBiddingTeam: null,
        currentBidAmount: null,
      },
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
      boughtTeam.budgetLeft - ongoingAuction.currentBidAmount; // 4950
    const requiuredPlayersAfterBid = boughtTeam.requiuredPlayers - 1; // 14

    const budgetForBasePricePurchase =
      (requiuredPlayersAfterBid - 1) * basePrice; // 650
    const budgetAfterBasePricePurchase =
      budgetLeftAfterBid - budgetForBasePricePurchase; // 4300

    const lowerBidPointerValue = getBidPointerAmount(
      budgetAfterBasePricePurchase
    ); // 2000
    const valueToGetReminder =
      budgetAfterBasePricePurchase - lowerBidPointerValue; // 2300
    const bidStepAmount = getBidStepAmount(budgetAfterBasePricePurchase); // 100<
    const reminderValue = valueToGetReminder % bidStepAmount; // 0
    const finalMaxBidPerPlayer = budgetAfterBasePricePurchase - reminderValue; //

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
      ongoingAuction: null,
      players: players.map((p) =>
        p.id === updatedPlayer.id ? updatedPlayer : p
      ),
      teams: teams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t)),
      soldPlayers: [...state.soldPlayers, updatedPlayer],
      availablePlayers: state.availablePlayers.filter(
        (p) => p.id !== updatedPlayer.id
      ),
    });
    // logic to mark player as sold to the team
  };

  return (
    <Card
      sx={{
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)", // soft shadow
        padding: 4,
        width: "50%",
        borderRadius: 4,
      }}
    >
      {player ? (
        <Stack spacing={2} direction="column">
          {/* Player info card starts */}
          <Card
            sx={{
              display: "flex",
              minHeight: 150,
              // alignItems: "center",
              boxSizing: "border-box",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // soft shadow
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
                <Stack>
                  <Typography variant="h4">{player.name}</Typography>
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
                      >
                        RESET
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
              // alignItems: "center",
              boxSizing: "border-box",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // soft shadow
              justifyContent: "flex-start",
              padding: 2,
            }}
          >
            <Stack spacing={2} direction="column">
              <TextField
                placeholder="Amount"
                type="number"
                variant="outlined"
                value={ongoingAuction.currentBidAmount}
                onWheel={(e) => e.target.blur()}
                onChange={(e) =>
                  updateState({ amount: Number(e.target.value) })
                }
              />
              <Grid container spacing={2}>
                {teams.map((team) => (
                  <Grid size={4} key={team.id} item sm={4}>
                    <Card
                      sx={{
                        boxShadow: "0 4px 5px rgba(0, 0, 0, 0.1)",
                        border:
                          ongoingAuction?.currentBiddingTeam?.id === team.id
                            ? "1px solid #12ed3af9"
                            : "1px solid #7a777797",
                        transition:
                          "transform 0.25s ease, box-shadow 0.25s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
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
                ))}
              </Grid>
            </Stack>
          </Card>
          {/* Auction card ends */}

          <Button
            variant="contained"
            color="primary"
            onClick={() => window.electronAPI.send("open-second-window")}
          >
            Open Second Window
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={resetGlobalState}
          >
            Reset
          </Button>
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Stack
            padding={2}
            alignItems={"center"}
            backgroundColor={"#da8f56ff"}
          >
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
      )}
    </Card>
  );
}

export default BiddingCardAdmin;
