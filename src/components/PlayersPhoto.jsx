import { Card, CardMedia, Typography, Stack } from "@mui/material";

export default function ImageCard({ image, name, bidAmount, specialBorder }) {
  return (
    <Card
      sx={{
        width: 190,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          height: 160,
          objectFit: "cover",
        }}
      />

      <Stack
        sx={{
          textAlign: "center",
          backgroundColor: specialBorder ? "#f083f2ff" : "#98f27dda",
          padding: 0.5,
        }}
      >
        <Typography variant="subtitle2" fontWeight={600}>
          {name}
        </Typography>
      </Stack>
      <Stack sx={{ textAlign: "center", padding: 0.5 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          {bidAmount}
        </Typography>
      </Stack>
    </Card>
  );
}
