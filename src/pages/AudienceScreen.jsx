import React, { useEffect } from "react";
import backgroundImg from "../assets/images/audience_screen_bgv4.jpeg";
import player from "../assets/images/mysteryCard2.png";
import splLogo from "../assets/images/spl_logo.jpg";
import styles from "./AudienceScreen.module.css";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import NeonCard from "../components/NeonCard";
import { useAppContext } from "../context/GlobalContext";
// import teams from "../data/teams.json";
import { getImageUrl } from "../utils/images";
import TeamsCardBiddingPanel from "../components/TeamsCardBiddingPanel";
import auctionHammerAnimation from "../assets/animations/auction_hammer.json";
import confettiAnimation from "../assets/animations/confetti.json";
import Lottie from "lottie-react";
import players from "../data/players.json";
import useSound from "../hooks/useSound";
import confettiPop from "../assets/sounds/confetti.mp3";
import applause from "../assets/sounds/applause.mp3";

const AudienceScreen = () => {
  const { state } = useAppContext();
  console.log("????", state);
  const { ongoingAuction , teams} = state || {};

  // const {}=state;
  const playConfetti = useSound(confettiPop, 0.8);
  const playApplause = useSound(applause, 0.8);

  useEffect(() => {
    if (players[0].currentBid !== null) {
      // playConfetti();
      // playApplause()       // play sound once when confetti starts
    }
  }, [players[0].currentBid]);

  return (
    <Box
      className={styles.container}
      sx={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <Stack
        sx={{
          height: 80,
          borderBottom: "2px solid red",
          padding: 4,
          backgroundColor: "red",
        }}
        alignItems={"center"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Box>
            <img src={splLogo} alt="icon" style={{ width: 100, height: 100 }} />
          </Box>
          <Typography variant="h3" sx={{ color: "#fff", fontWeight: "bold" }}>
            SPL Auction Live Bidding
          </Typography>
          <Box>
            <img src={splLogo} alt="icon" style={{ width: 100, height: 100 }} />
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ padding: 2, height: "100%" }}>
        <Stack
          spacing={4}
          direction={"row"}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <Box sx={{ width: "30%" }}>
            <Box
              sx={{
                zIndex: 1,
                width: "100%",
              }}
            >
              <NeonCard sx={{ width: "100%" }}>
                <Stack
                  spacing={2}
                  direction={"column"}
                  alignItems="center"
                  justifyContent={"flex-start"}
                  padding={2}
                >
                  <Stack direction={"column"} alignItems={"center"} spacing={2}>
                    <Stack>
                      <Typography variant="h5" gutterBottom>
                        Ongoing Bid
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"column"}
                      alignItems={"center"}
                      spacing={2}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          ongoingAuction
                            ? getImageUrl(ongoingAuction?.player.photo)
                            : player
                        }
                        sx={{
                          width: 280,
                          height: 280,
                          boxShadow:
                            "0 0 5px #e3e2eff9, 0 0 5px #e3e2eff9, 0 0 5px #e3e2eff9",
                          backgroundColor: "#111",
                          color: "#fff",
                          transition: "0.3s",
                          "&:hover": {
                            boxShadow:
                              "0 0 5px #e3e2eff9, 0 0 5px #e3e2eff9, 0 0 10px #e3e2eff9",
                          },
                        }}
                      />
                      {ongoingAuction?.player.name ? (
                        <Typography variant="h4">
                          {ongoingAuction?.player.name ||
                            "Waiting for next player..."}
                        </Typography>
                      ) : (
                        <Typography
                          variant="h4"
                          sx={{
                            display: "inline-block",
                            animation: "zoomInOut 1s infinite",
                            "@keyframes zoomInOut": {
                              "0%": { transform: "scale(1)" },
                              "50%": { transform: "scale(1.2)" },
                              "100%": { transform: "scale(1)" },
                            },
                          }}
                        >
                          Waiting for next player...
                        </Typography>
                      )}
                    </Stack>
                  </Stack>

                  <Stack width={400}>
                    <Box
                      sx={{
                        padding: 2,
                        border: "2px solid #12ed3af9",
                        boxShadow:
                          "0 0 3px #12ed3af9, 0 0 3px #12ed3af9, 0 0 10px #12ed3af9",
                      }}
                    >
                      <Stack
                        direction={"column"}
                        alignItems="center"
                        spacing={2}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="h6" gutterBottom>
                          Current Bid
                        </Typography>
                        {!ongoingAuction ||
                        ongoingAuction?.currentBidAmount === null ? (
                          <Box sx={{ width: 300, height: 300 }}>
                            <Lottie
                              animationData={auctionHammerAnimation}
                              loop={true} // loop animation
                              autoplay={true} // start automatically
                            />
                          </Box>
                        ) : (
                          <Stack
                            direction={"column"}
                            alignItems="center"
                            spacing={2}
                            justifyContent={"space-between"}
                          >
                            <Typography
                              variant="h1"
                              sx={{
                                fontWeight: "bold",
                                display: "inline-block",
                                animation: "zoomInOut 1s infinite",
                                "@keyframes zoomInOut": {
                                  "0%": { transform: "scale(1)" },
                                  "50%": { transform: "scale(1.2)" },
                                  "100%": { transform: "scale(1)" },
                                },
                              }}
                            >
                              {ongoingAuction?.currentBidAmount}
                            </Typography>
                            <Box>
                              <img
                                src={getImageUrl(
                                  ongoingAuction?.currentBiddingTeam?.logo
                                )}
                                alt="icon"
                                style={{ width: 150, height: 150 }}
                              />
                            </Box>
                            <Typography variant="h4">
                              {ongoingAuction?.currentBiddingTeam?.name}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </NeonCard>
              {/* CONFETTI OVERLAY */}
              {/* <Box
                sx={{
                  position: "absolute",
                  inset: 0, // top:0 right:0 bottom:0 left:0
                  pointerEvents: "none",
                  zIndex: 5,
                  overflow: "hidden",
                }}
              >
                <Lottie
                  animationData={confettiAnimation}
                  loop
                  autoplay
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%) translateY(40%)",
                    //       ↑ pushes animation DOWN beyond the canvas bottom
                    width: "150%",
                    height: "150%",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </Box> */}
            </Box>
          </Box>

          {/* Teams Details */}
          <Grid container spacing={2} sx={{ width: "60%" }}>
            {teams?.map((team) => (
              <Grid size={6} key={team.id} item sm={6} md={6}>
                <TeamsCardBiddingPanel
                  sx={{
                    minHeight: 120,
                    color: "#fff",
                    borderRadius: 4,
                  }}
                  team={team}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default AudienceScreen;
