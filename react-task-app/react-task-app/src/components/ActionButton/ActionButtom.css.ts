import { style } from "@vanilla-extract/css";
import { globalStyle } from "../../App.css";

export const NewTaskUpload = style({
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: "12px",
  width: "100%",
  height: "40px",
  cursor: "pointer",
  padding: "5px",

  ":hover": {
    backgroundColor: globalStyle.color.secondaryDarkTextHover,
  },
});

export const NewTask = style({
  marginLeft: "5px",
});

export const Container = style({
  maxWidth: "224px",
  width: "100%",
  height: "max-content",
  display: "flex",

  alignItems: "center",

  marginTop: "15px",
  backgroundColor: globalStyle.color.main,
  color: "white",
  padding: "5px",
  cursor: "pointer",

  ":hover": {
    backgroundColor: globalStyle.color.mainFaded,
  },
});

export const Span = style({
  marginLeft: "5px",
});
