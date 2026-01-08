import { Grid, Stack, Typography } from "@mui/material";

const TextInfo = ({ type, uiType, value, secondaryValue = null }) => {
  return (
    <Grid
      container
      direction={"row"}
      spacing={2}
      sx={{ width: "100%" }}
      alignItems={"center"}
    >
      <Grid size={6} item md={4}>
        {uiType || (
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {type}
          </Typography>
        )}
      </Grid>
      <Grid item md={5}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Typography variant="h6" component="div">
            {value}
          </Typography>
          {secondaryValue !== null && (
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ marginLeft: 1 }}
            >
              {"/"} {secondaryValue}
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TextInfo;
