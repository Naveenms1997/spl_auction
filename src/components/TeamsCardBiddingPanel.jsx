import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { getImageUrl } from "../utils/images";
import { Grid, Stack } from "@mui/material";
import TextComponent from "./TextDetail";

export default function TeamsCardBiddingPanel({ team }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        minHeight: 150,
        boxSizing: "border-box",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.9)", // soft shadow
        justifyContent: "flex-start",
      }}
    >
      <Box sx={{ marginRight: 2 }}>
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
            <TextComponent
              type={"Players bought"}
              value={team.playersBought}
              secondaryValue={15}
            />
            <TextComponent type={"Max bid/player"} value={team.maxBidPerPlayer} />
            <TextComponent type={"Remaining budget"} value={team.budgetLeft} secondaryValue={5000} />
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
