import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import GavelIcon from "@mui/icons-material/Gavel";
import { useAppContext } from "../context/GlobalContext";

const BID_RESULT_PRIORITY = {
  AVAILABLE: 1,
  UNSOLD: 2,
  SOLD: 3,
};

function AvailablePlayers() {
  const { state } = useAppContext();
  const { players, soldPlayers, unsoldPlayers, availablePlayers } = state || {};

  const sortedPlayers = [...players].sort((a, b) => {
    return BID_RESULT_PRIORITY[a.bidResult] - BID_RESULT_PRIORITY[b.bidResult];
  });

  return (
    <Box sx={{ padding: 2, height: "100%" }}>
      <Stack spacing={1}>
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
              padding={1}
              backgroundColor={"#ef9103e7"}
              width={"100%"}
              alignItems={"center"}
            >
              <Typography variant="h5">Auction Summary</Typography>
            </Stack>

            <Stack
              direction={"row"}
              width={"100%"}
              alignItems={"flex-start"}
              justifyContent={"space-evenly"}
              padding={1}
            >
              <Chip
                label={
                  <Typography variant="subtitle1">{`Available Players : ${
                    availablePlayers?.length || 0
                  }`}</Typography>
                }
                variant="outlined"
                color="info"
                icon={<GroupAddRoundedIcon />}
              />
              <Chip
                label={
                  <Typography variant="subtitle1">{`Sold Players : ${
                    soldPlayers?.length || 0
                  }`}</Typography>
                }
                variant="filled"
                color="success"
                icon={<GavelIcon />}
              />
              <Chip
                label={
                  <Typography variant="subtitle1">{`Unsold Players : ${
                    unsoldPlayers?.length || 0
                  }`}</Typography>
                }
                variant="outlined"
                color="error"
                icon={<DoNotDisturbAltIcon />}
              />
            </Stack>
          </Stack>
        </Card>

        <Stack direction={"column"} spacing={1} justifyContent={"flex-start"}>
          <Stack
            padding={1}
            backgroundColor={"#0814f0d0"}
            alignItems={"center"}
            borderRadius={2}
          >
            <Typography variant="h5" color="#fff">
              Available Players
            </Typography>
          </Stack>

          <Stack
            spacing={2}
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Card
              sx={{
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // soft shadow
                borderRadius: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  display: "grid",
                  gridTemplateRows: "repeat(17, auto)",
                  gridAutoFlow: "column",
                  columnGap: 2,
                  rowGap: 1,
                }}
              >
                {(sortedPlayers || []).map((player, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    width="100%"
                  >
                    <Chip
                      label={
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: "bold" }}
                        >
                          {player?.name || ""}
                        </Typography>
                      }
                      sx={{
                        backgroundColor: () => {
                          if (player.bidResult === "SOLD") return "#5fe978f9";
                          else if (player.bidResult === "UNSOLD")
                            return "#f95d5df0";
                          else return "#b6ebe8ad";
                        },
                        color: "#000",
                        fontWeight: "bold",
                        border: player
                          ? "1px solid #161d15b5"
                          : "1px solid #242b2222",
                        width: "100%",
                        justifyContent: "flex-start",
                      }}
                    />
                  </Stack>
                ))}
              </Box>
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default AvailablePlayers;
