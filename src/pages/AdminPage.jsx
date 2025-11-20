import React from "react";
import { useAppContext } from "../context/GlobalContext";
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
// import backgroundImg from "../assets/images/blue_abstract_lines_2.jpg";
import teams from "../data/teams.json";
import players from "../data/players.json";
import TextComponent from "../components/TextDetail";
import { getImageUrl } from "../utils/images";
import BiddingCardAdmin from "../components/BiddingCardAdmin";

export default function AdminPage() {
  const { state, updateState } = useAppContext();
  const { ongoingAuction } = state;

  const resetState = () => {
    updateState({ player: "", amount: 0 });
  };
  return (
    <Box padding={4}>
      <Stack
        direction="row"
        spacing={4}
        justifyContent={"space-between"}
        mb={4}
      >
        <BiddingCardAdmin player={ongoingAuction?.player} />

        <Card
          sx={{
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // soft shadow
            padding: 4,
            width: "20%",
          }}
        >
          <Stack>
            <Stack
              direction={"column"}
              spacing={2}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
            >
              <Stack
                sx={{
                  backgroundColor: "#68e26eb6",
                  width: "100%",
                  alignItems: "center",
                  color: "#000",
                }}
              >
                <Typography variant="h6">Audience Screen Pages</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
