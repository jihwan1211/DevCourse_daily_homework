import { style } from "@vanilla-extract/css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  height: "max-content",
  marginTop: "15px",
});

export const Button = style({
  maxWidth: "40px",
  minWidth: "15px",
  marginTop: "10px",
});
