import { useState } from "react";
import { useAppContext } from "../context/GlobalContext";
import { Box, Button, Card, Stack } from "@mui/material";
import BiddingCardAdmin from "../components/BiddingCardAdmin";
import ChoosePlayer from "../components/ChoosePlayer";
import AudienceScreens from "../components/AudienceScreens";
import UnsoldPlayers from "./UnsoldPlayers";

export default function AdminPage() {
  const { state, updateState, resetGlobalState } = useAppContext();
  const { ongoingAuction, eventStatus, players, unsoldPlayers } = state || {};

  const [openUnsoldPlayer, setOpenUnsoldPlayer] = useState(false);

  const chooseNextPlayer = () => {
    if (openUnsoldPlayer) {
      setOpenUnsoldPlayer(false);
    }
    updateState({
      eventStatus: "NEXT_PLAYER",
    });
  };

  const makeUnsoldPlayersAvailable = () => {
    const unsoldPlayersData = unsoldPlayers.map((playerId, i) => {
      const playerData = players.find((p) => p.id === playerId);
      return { ...playerData };
    });

    const formattedUnsoldPlayersData = unsoldPlayersData.map(
      (player, index) => ({
        ...player,
        bidResult: "AVAILABLE",
      })
    );

    const formattedPlayersList = players.map((p) => {
      const updatedPlayer = formattedUnsoldPlayersData.find(
        (up) => up.id === p.id
      );
      return updatedPlayer ? updatedPlayer : p;
    });

    updateState({
      players: formattedPlayersList,
      availablePlayers: [
        ...state.availablePlayers,
        ...formattedUnsoldPlayersData,
      ],
      unsoldPlayers: [],
    });
  };

  return (
    <Box padding={4}>
      <Stack
        direction="row"
        spacing={4}
        justifyContent={"space-between"}
        mb={4}
      >
        <Card
          sx={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)", // soft shadow
            padding: 4,
            width: "50%",
            borderRadius: 4,
          }}
        >
          <Stack direction={"column"} spacing={2} justifyContent={"flex-start"}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={chooseNextPlayer}
                disabled={!ongoingAuction?.isSold && !ongoingAuction?.isUnsold}
              >
                Choose Next Player
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpenUnsoldPlayer(true)}
              >
                Unsold players
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={resetGlobalState}
              >
                RESET
              </Button>
            </Stack>
            {openUnsoldPlayer ? (
              <Card
                sx={{
                  height: 400,
                  width: "100%",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)", // soft shadow
                  padding: 2,
                }}
              >
                <Stack
                  direction={"column"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  spacing={2}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={makeUnsoldPlayersAvailable}
                    >
                      Make Available
                    </Button>
                  </Stack>
                  <Card
                    sx={{
                      height: 400,
                      width: "100%",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.31)", // soft shadow
                    }}
                  >
                    <UnsoldPlayers />
                  </Card>
                </Stack>
              </Card>
            ) : eventStatus === "NEXT_PLAYER" ? (
              <ChoosePlayer />
            ) : (
              <BiddingCardAdmin player={ongoingAuction?.player} />
            )}
          </Stack>
        </Card>

        {/* AUDIENCE SCREEN ACTION */}
        <Stack sx={{ width: "20%" }}>
          <AudienceScreens />
        </Stack>
      </Stack>
    </Box>
  );
}
