import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import GavelIcon from "@mui/icons-material/Gavel";
import { useAppContext } from "../context/GlobalContext";
import teams from "../data/teams.json";

function AudienceScreens() {
  const { state, updateState } = useAppContext();
  const { audienceScreen, ongoingAuction } = state || {};

  const setAudienceScreenView = (view) => {
    updateState({
      audienceScreen: view,
      ongoingAuction: { ...ongoingAuction, playSoundAnime: false },
    });
  };
  return (
    <Card
      sx={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // soft shadow
        padding: 4,
      }}
    >
      <Stack>
        <Stack
          direction={"column"}
          spacing={2}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <Button
            variant="contained"
            color="inherit"
            onClick={() => window.electronAPI.send("open-second-window")}
          >
            Open Second Window
          </Button>

           <Button
                  variant={
                    audienceScreen === "GUEST_PAGE"
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => {
                    setAudienceScreenView("GUEST_PAGE");
                  }}
                >
                  Guest Page
                </Button>

                <Button
                  variant={
                    audienceScreen === "WELCOME_PAGE"
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => {
                    setAudienceScreenView("WELCOME_PAGE");
                  }}
                >
                  Welcome Page
                </Button>

          <Stack
            padding={2}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
            }}
            spacing={2}
          >
            <Stack direction="column" spacing={1}>
              <Stack
                sx={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Audience Screen Pages</Typography>
              </Stack>

              <Stack spacing={2}>
                <Button
                  variant={
                    audienceScreen === "AUCTION_PANEL"
                      ? "contained"
                      : "outlined"
                  }
                  color="warning"
                  startIcon={<GavelIcon />}
                  onClick={() => {
                    setAudienceScreenView("AUCTION_PANEL");
                  }}
                >
                  Auction Panel
                </Button>

                <Button
                  variant={
                    audienceScreen === "TEAMS" ? "contained" : "outlined"
                  }
                  color="warning"
                  onClick={() => {
                    setAudienceScreenView("TEAMS");
                  }}
                  startIcon={<GroupsIcon />}
                >
                  All Teams Squads
                </Button>
              </Stack>
            </Stack>

            <Stack
              direction="column"
              spacing={1}
              sx={{
                // backgroundColor: "#eaeae0d3",
              }}
            >
              <Stack>
                <Typography variant="h6">Team Squads</Typography>
              </Stack>
              <Stack spacing={2}>
                {teams.map((team) => (
                  <Button
                    key={team.id}
                    variant={
                      audienceScreen === team.id ? "contained" : "outlined"
                    }
                    onClick={() => {
                      setAudienceScreenView(team.id);
                    }}
                  >
                    {team.name}
                  </Button>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

export default AudienceScreens;
