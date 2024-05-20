import { style } from "@vanilla-extract/css";
import { globalStyle } from "../../App.css";

export const Container = style({
  maxWidth: "100%",
  boxSizing: "border-box",
  width: "100%",
  height: "max-content",
  display: "flex",
  alignItems: "center",
  padding: "5px",
  cursor: "pointer",

  ":hover": {
    backgroundColor: globalStyle.color.secondaryDarkTextHover,
  },
});

export const Span = style({
  marginLeft: "5px",
});

export const NewList = style({
  backgroundColor: globalStyle.color.main,
  color: "white",
  height: "max-content",
  padding: "10px",
  width: "max-content",
  cursor: "pointer",
  borderRadius: "12px",
  ":hover": {
    backgroundColor: globalStyle.color.mainFaded,
  },
});
