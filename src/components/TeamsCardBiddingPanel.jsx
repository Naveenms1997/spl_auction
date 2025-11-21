import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getImageUrl } from "../utils/images";
import { Stack } from "@mui/material";
import TextInfo from "./TextDetail";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useAppContext } from "../context/GlobalContext";

export default function TeamsCardBiddingPanel({ team, sx }) {
  const { state } = useAppContext();
  const { auctionRules } = state || {};

  return (
    <Card
      sx={{
        display: "flex",
        minHeight: 150,
        boxSizing: "border-box",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.9)", // soft shadow
        border: "2px solid rgba(0, 0, 0, 0.9)",
        justifyContent: "flex-start",
        ...sx,
      }}
    >
      <Box
        sx={{ marginRight: 2, boxShadow: "1px 4px 10px rgba(0, 0, 0, 0.9)" }}
      >
        <CardMedia
          component="img"
          sx={{ width: 130, height: "100%", objectFit: "contain" }}
          image={getImageUrl(team.logo)}
          alt="Live from space album cover"
        />
      </Box>
      <Box sx={{ flexDirection: "column", width: "100%" }}>
        <Stack sx={{ width: "100%" }} spacing={1}>
          <Stack sx={{ borderBottom: "1px solid #5a575748" }}>
            <Typography variant="h4">{team.name}</Typography>
          </Stack>
          <Stack>
            <TextInfo
              uiType={
                <Stack
                  direction={"row"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-start"}
                  spacing={1}
                >
                  <Diversity3Icon sx={{ color: "#109c0eff" }} />
                  <Typography variant="subtitle2">Squad</Typography>
                </Stack>
              }
              value={
                <Stack
                  direction={"row"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-start"}
                  spacing={1}
                >
                  <Typography variant="h4" sx={{ color: "#109c0eff" }}>
                    {team.playersBought || 0}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#6bc86af1" }}>
                    /{auctionRules?.maxPlayersPerTeam}
                  </Typography>
                </Stack>
              }
            />
            <TextInfo
              uiType={
                <Stack
                  direction={"row"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-start"}
                  spacing={1}
                >
                  <TrendingUpRoundedIcon sx={{ color: "#ea0909ff" }} />
                  <Typography variant="subtitle2">Max Bid</Typography>
                </Stack>
              }
              value={
                <Typography variant="h5" sx={{ color: "#ef4a4aff" }}>
                  {team.maxBidPerPlayer}
                </Typography>
              }
            />
            <TextInfo
              uiType={
                <Stack
                  direction={"row"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-start"}
                  spacing={1}
                >
                  <AccountBalanceWalletIcon sx={{ color: "#4d4bceff" }} />
                  <Typography variant="subtitle2">Budget</Typography>
                </Stack>
              }
              value={
                <Stack
                  direction={"row"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-start"}
                  spacing={1}
                >
                  <Typography variant="h5" sx={{ color: "#4d4bceff" }}>
                    {team.budgetLeft}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "#605ed0c3" }}>
                    /5000
                  </Typography>
                </Stack>
              }
            />
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
