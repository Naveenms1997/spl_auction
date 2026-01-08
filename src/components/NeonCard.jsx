import React from "react";
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import { neoCardBgv } from "../assets/index";

// Styled card with neon glow
const NeonCardStyled = styled(Card)(({ theme }) => ({
  border: "2px solid #09a8e7f9",
  borderRadius: "12px",
  boxShadow: "0 0 3px #09a8e7f9, 0 0 3px #09a8e7f9, 0 0 5px #09a8e7f9",
  color: "#fff",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 0 5px #09a8e7f9, 0 0 5px #09a8e7f9, 0 0 10px #09a8e7f9",
  },
  backgroundImage: `url(${neoCardBgv})`,
}));

export default function NeonCard({ children, sx }) {
  return <NeonCardStyled sx={sx}>{children}</NeonCardStyled>;
}
