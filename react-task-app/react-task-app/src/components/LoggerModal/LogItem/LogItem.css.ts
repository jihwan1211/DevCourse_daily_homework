import { style } from "@vanilla-extract/css";
import { globalStyle } from "../../../App.css";

export const Container = style({
  color: "white",
  margin: "10px 0",
  cursor: "pointer",
  ":hover": {
    opacity: 0.5,
    backgroundColor: globalStyle.color.mainDarker,
  },
});

export const Main = style({
  display: "flex",
  flexDirection: "column",
});
