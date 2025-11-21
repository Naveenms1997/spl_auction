import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getImageUrl } from "../utils/images";
import { Stack } from "@mui/material";
import TextInfo from "./TextDetail";

export default function TeamsCardBiddingPanel({ team }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        minHeight: 150,
        boxSizing: "border-box",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.9)", // soft shadow
        border:"2px solid rgba(0, 0, 0, 0.9)",
        justifyContent: "flex-start",
      }}
    >
      <Box sx={{ marginRight: 2,  boxShadow: "1px 4px 10px rgba(0, 0, 0, 0.9)",  }}>
        <CardMedia
          component="img"
          sx={{ width: 130, height: "100%", objectFit: "contain" }}
          image={getImageUrl(team.logo)}
          alt="Live from space album cover"
        />
      </Box>
      <Box sx={{ flexDirection: "column", width: "100%" }}>
        <Stack sx={{ width: "100%" }}>
          <Stack>
            <Typography variant="h4">{team.name}</Typography>
          </Stack>
          <Stack>
            <TextInfo
              type={"Players bought"}
              value={team.playersBought}
              secondaryValue={15}
            />
            <TextInfo type={"Max bid/player"} value={team.maxBidPerPlayer} />
            <TextInfo type={"Remaining budget"} value={team.budgetLeft} secondaryValue={5000} />
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
