import { useEffect } from "react";
import { mysteryPlayer, audienceScreenBg } from "../assets/index";
import { splLogo } from "../assets/index";
import styles from "./AudienceScreen.module.css";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import NeonCard from "../components/NeonCard";
import { useAppContext } from "../context/GlobalContext";
import TeamsCardBiddingPanel from "../components/TeamsCardBiddingPanel";
import auctionHammerAnimation from "../assets/animations/auction_hammer.json";
import errorAnimation from "../assets/animations/error.json";
import questionMarkAnimation from "../assets/animations/questionMark.json";
import confettiAnimation from "../assets/animations/confetti.json";
import Lottie from "lottie-react";
import useSound from "../hooks/useSound";
import confettiPopSound from "../assets/sounds/confetti.mp3";
import applauseSound from "../assets/sounds/applause.mp3";
import unsoldSound from "../assets/sounds/unsold.mp3";
import TextInfo from "../components/TextDetail";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import GavelIcon from "@mui/icons-material/Gavel";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import Teams from "./Teams";

const AudienceScreen = () => {
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

  const playConfettiSound = useSound(confettiPopSound, 0.8);
  const playApplauseSound = useSound(applauseSound, 0.8);
  const playUnsoldSound = useSound(unsoldSound, 0.8);

  useEffect(() => {
    if (
      ongoingAuction &&
      eventStatus === "ONGOING" &&
      audienceScreen === "AUCTION_PANEL" &&
      ongoingAuction.playSoundAnime
    ) {
      if (ongoingAuction?.isSold) {
        playConfettiSound();
        playApplauseSound(); // play sound once when confetti starts
      }
      if (ongoingAuction?.isUnsold) {
        playUnsoldSound();
      }
    }
  }, [ongoingAuction]);

  // const getHighestBid = () => {
  //   if (soldPlayers?.length) {
  //     const highestBidPlayer = soldPlayers?.reduce((max, player) =>
  //       player.finalBidAmount > max.finalBidAmount ? player : max
  //     );
  //     return highestBidPlayer;
  //   }
  // };

  return (
    <Box
      className={styles.container}
      sx={{
        backgroundImage: audienceScreenBg,
      }}
    >
      <Stack
        sx={{
          height: 80,
          borderBottom: "1px solid #fff",
          boxShadow: "0 0 5px #fff, 0 0 5px #fff, 0 0 5px #fff",
          padding: 4,
          backgroundColor: "#0a163dd6",
        }}
        alignItems={"center"}
      >
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
          spacing={4}
        >
          <Box>
            <img src={splLogo} alt="icon" style={{ width: 100, height: 100 }} />
          </Box>
          <Typography variant="h2" sx={{ color: "#fff", fontWeight: "bold" }}>
            SPL-3 Auction
          </Typography>
          <Box>
            <img src={splLogo} alt="icon" style={{ width: 100, height: 100 }} />
          </Box>
        </Stack>
      </Stack>

      {audienceScreen === "AUCTION_PANEL" ? (
        <Box sx={{ padding: 2, height: "100%" }}>
          <Stack
            spacing={4}
            direction={"row"}
            alignItems="flex-start"
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            {/* ONGOING BID PANEL */}
            <Box sx={{ width: "30%" }}>
              <Box
                sx={{
                  zIndex: 1,
                  width: "100%",
                  position: "relative",
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
                    <Stack
                      direction={"column"}
                      alignItems={"center"}
                      spacing={2}
                    >
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
                            eventStatus === "NEXT_PLAYER"
                              ? mysteryPlayer
                              : ongoingAuction
                              ? ongoingAuction?.player.photo
                              : mysteryPlayer
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
                        {eventStatus === "ONGOING" ? (
                          <Stack
                            direction={"column"}
                            spacing={1}
                            alignItems={"center"}
                          >
                            <Typography variant="h4">
                              {ongoingAuction?.player.name}
                            </Typography>
                            <Typography variant="h6">
                              {ongoingAuction?.player.type}
                            </Typography>
                          </Stack>
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
                          border:
                            eventStatus === "NEXT_PLAYER"
                              ? "2px solid #ea892ff9"
                              : ongoingAuction?.isUnsold
                              ? "2px solid #de3232f9"
                              : "2px solid #12ed3af9",

                          animation:
                            eventStatus === "NEXT_PLAYER"
                              ? "blinkOrange 0.7s infinite alternate"
                              : ongoingAuction?.isUnsold
                              ? "blinkRed 0.7s infinite alternate"
                              : "blinkGreen 0.7s infinite alternate",

                          "@keyframes blinkOrange": {
                            "0%": {
                              boxShadow:
                                "0 0 3px #ea892ff9, 0 0 3px #ea892ff9, 0 0 8px #ea892ff9",
                            },
                            "100%": {
                              boxShadow:
                                "0 0 10px #ea892ff9, 0 0 10px #ea892ff9, 0 0 20px #ea892ff9",
                            },
                          },

                          "@keyframes blinkRed": {
                            "0%": {
                              boxShadow:
                                "0 0 3px #de3232f9, 0 0 3px #de3232f9, 0 0 8px #de3232f9",
                            },
                            "100%": {
                              boxShadow:
                                "0 0 10px #de3232f9, 0 0 10px #de3232f9, 0 0 20px #de3232f9",
                            },
                          },

                          "@keyframes blinkGreen": {
                            "0%": {
                              boxShadow:
                                "0 0 3px #12ed3af9, 0 0 3px #12ed3af9, 0 0 8px #12ed3af9",
                            },
                            "100%": {
                              boxShadow:
                                "0 0 10px #12ed3af9, 0 0 10px #12ed3af9, 0 0 20px #12ed3af9",
                            },
                          },
                        }}
                      >
                        <Stack
                          direction={"column"}
                          alignItems="center"
                          spacing={2}
                          justifyContent={"space-between"}
                        >
                          {eventStatus === "NEXT_PLAYER" ? null : (
                            <Typography variant="h6" gutterBottom>
                              {ongoingAuction?.isSold
                                ? "SOLD"
                                : ongoingAuction?.isUnsold
                                ? "UNSOLD"
                                : "Current Bid"}
                            </Typography>
                          )}
                          {eventStatus === "NEXT_PLAYER" ? (
                            <Box sx={{ width: 300, height: 300 }}>
                              <Lottie
                                animationData={questionMarkAnimation}
                                loop={true}
                                autoplay={true}
                              />
                            </Box>
                          ) : ongoingAuction?.currentBidAmount === null &&
                            !ongoingAuction?.isUnsold ? (
                            <Box sx={{ width: 300, height: 300 }}>
                              <Lottie
                                animationData={auctionHammerAnimation}
                                loop={true}
                                autoplay={true}
                              />
                            </Box>
                          ) : (
                            <Stack>
                              {ongoingAuction?.isUnsold ? (
                                <Box sx={{ width: 300, height: 300 }}>
                                  <Lottie
                                    animationData={errorAnimation}
                                    loop={true}
                                    autoplay={true}
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
                                      color: ongoingAuction?.isSold
                                        ? "#12ed3af9"
                                        : "#fff",
                                    }}
                                  >
                                    {ongoingAuction?.currentBidAmount}
                                  </Typography>
                                  <Box>
                                    <img
                                      src={
                                        ongoingAuction?.currentBiddingTeam?.logo
                                      }
                                      alt="icon"
                                      style={{ width: 150, height: 150 }}
                                    />
                                  </Box>
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      color: ongoingAuction?.isSold
                                        ? "#12ed3af9"
                                        : "#fff",
                                    }}
                                  >
                                    {ongoingAuction?.currentBiddingTeam?.name}
                                  </Typography>
                                </Stack>
                              )}
                            </Stack>
                          )}
                        </Stack>
                      </Box>
                    </Stack>
                  </Stack>
                </NeonCard>

                {/* CONFETTI OVERLAY */}
                {eventStatus === "ONGOING" && ongoingAuction?.isSold ? (
                  <Box
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
                  </Box>
                ) : null}
              </Box>
            </Box>

            {/* Teams Details */}
            <Stack sx={{ width: "60%" }} spacing={2}>
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
                    justifyContent={"space-between"}
                  >
                    <Stack padding={2} width={"40%"} spacing={1}>
                      <TextInfo
                        type={
                          <Chip
                            label={"Remaining Players"}
                            variant="outlined"
                            color="info"
                            icon={<GroupAddRoundedIcon />}
                          />
                        }
                        value={
                          <Stack
                            direction={"row"}
                            alignItems={"flex-end"}
                            justifyContent={"flex-start"}
                            spacing={1}
                          >
                            <Typography
                              variant="h4"
                              sx={{ color: "#0d939fff" }}
                            >
                              {availablePlayers?.length || 0}
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{ color: "#0d939fff" }}
                            >
                              /{players?.length || 0}
                            </Typography>
                          </Stack>
                        }
                      />
                      <TextInfo
                        type={
                          <Chip
                            label={"Sold Players"}
                            variant="filled"
                            color="success"
                            icon={<GavelIcon />}
                          />
                        }
                        value={
                          <Typography variant="h4" sx={{ color: "#03520bff" }}>
                            {soldPlayers?.length || 0}
                          </Typography>
                        }
                      />
                      <TextInfo
                        type={
                          <Chip
                            label={"Unsold Players"}
                            variant="outlined"
                            color="error"
                            icon={<DoNotDisturbAltIcon />}
                          />
                        }
                        value={
                          <Typography variant="h4" sx={{ color: "#f80606ff" }}>
                            {unsoldPlayers?.length || 0}
                          </Typography>
                        }
                      />
                    </Stack>
                    {/* <Stack padding={2} width={"50%"}>
                      {getHighestBid() ? (
                        <Stack direction={"row"} alignItems={"flex-end"} justifyContent={"flex-start"} spacing={4}> 
                                <Chip
                               label={"Highest Bid"}
                               variant="filled"
                               color="warning"
                               icon={<HailIcon />}
                             />
                                   <Typography variant="h6">
                               {getHighestBid()?.name} {"-"}{" "}
                               {getHighestBid()?.finalBidAmount}
                             </Typography>
                        </Stack>
                      ) : null}
                    </Stack> */}
                  </Stack>
                </Stack>
              </Card>

              <Grid container spacing={2} sx={{ width: "100%" }}>
                {teams?.map((team) => (
                  <Grid size={6} key={team.id} item sm={6} md={6}>
                    <TeamsCardBiddingPanel
                      sx={{
                        minHeight: 120,
                        borderRadius: 2,
                      }}
                      team={team}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Box>
      ) : null}

      {audienceScreen === "TEAMS" ? <Teams /> : null}
    </Box>
  );
};

export default AudienceScreen;
