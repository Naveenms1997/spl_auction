import React from "react";
import backgroundImg from "../assets/images/blue_abstract_lines_2.jpg";
import player from "../assets/images/player_1.jpg";
import styles from "./AudienceScreen.module.css";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import NeonCard from "../components/NeonCard";

const AudienceScreen = () => {
  return (
    <Box
      className={styles.container}
      sx={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <Box sx={{ padding: 2, border: "2px solid red", height: "100%" }}>
        <Stack
          spacing={4}
          direction={"row"}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <NeonCard sx={{ padding: 4, width: 500 }}>
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
                    width: 250,
                    height: 250,
                    border: "2px solid #00dfff",
                    // borderRadius: "12px",
                    boxShadow:
                      "0 0 5px #00dfff, 0 0 5px #00dfff, 0 0 5px #00dfff",
                    backgroundColor: "#111",
                    color: "#fff",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow:
                        "0 0 5px #00dfff, 0 0 5px #00dfff, 0 0 10px #00dfff",
                    },
                  }}
                />
                <Typography variant="h4">
                  Naveen 
                </Typography>
              </Stack>
            </Stack>
          </NeonCard>

          <Stack>
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
