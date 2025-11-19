import React from "react";
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import neoCardBgv from "../assets/images/neoCardBgv2.jpg";

// Styled card with neon glow
const NeonCardStyled = styled(Card)(({ theme }) => ({
  border: "2px solid #00dfff",
  borderRadius: "12px",
  boxShadow: "0 0 1px #00dfff, 0 0 1px #00dfff, 0 0 1px #00dfff",
  backgroundColor: "#111",
  color: "#fff",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 0 5px #00dfff, 0 0 5px #00dfff, 0 0 10px #00dfff",
  },
  backgroundImage: `url(${neoCardBgv})` 
}));

export default function NeonCard({ children, sx }) {
  return <NeonCardStyled sx={sx}>{children}</NeonCardStyled>;
}
