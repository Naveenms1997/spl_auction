import React from "react";
import backgroundImg from "../assets/images/ftyu23.jpg";
import player from "../assets/images/player_1.jpg";
import styles from "./AudienceScreen.module.css";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import NeonCard from "../components/NeonCard";
import { useAppContext } from "../context/GlobalContext";

const AudienceScreen = () => {
  const { state } = useAppContext();

  return (
    <Box
      className={styles.container}
      sx={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <Box>
        <Typography variant="h5">HEADER</Typography>
      </Box>
      <Box sx={{ padding: 2, border: "2px solid red", height: "100%" }}>
        <Stack
          spacing={4}
          direction={"row"}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <NeonCard sx={{ padding: 4, width: 500 }}>
            <Stack
              spacing={4}
              direction={"column"}
              alignItems="center"
              justifyContent={"flex-start"}
            >
              <Stack direction={"column"} alignItems={"center"} spacing={2}>
                <Stack>
                  <Typography variant="h5" gutterBottom>
                    Ongoing bid panel
                  </Typography>
                </Stack>
                <Stack direction={"column"} alignItems={"center"} spacing={2}>
                  <Avatar
                    alt="Remy Sharp"
                    src={player}
                    sx={{
                      width: 350,
                      height: 350,
                      // border: "2px solid #e3e2eff9",
                      // borderRadius: "12px",
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
                  <Typography variant="h4">Naveen</Typography>
                </Stack>
              </Stack>

              <Stack>
                <Box
                  sx={{
                    padding: 2,
                    border: "2px solid #70ee10ff",
                    width: 400,
                    borderRadius: "999px",
                  }}
                >
                  <Stack
                    direction={"column"}
                    alignItems="center"
                    spacing={2}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="h6">Current Bid</Typography>
                    <Typography variant="h2">{state?.amount}</Typography>
                    <Typography variant="h4">Surgical strikers</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </NeonCard>

          <Stack sx={{ width: 500, border: "2px solid red" }}>
            <Typography variant="body1">Teams details</Typography>
          </Stack>
        </Stack>
      </Box>
      {/* <Box className={styles.content}>
        Welcome to the AudienceScreen
      </Box> */}
    </Box>
  );
};

export default AudienceScreen;
