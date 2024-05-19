import { style } from "@vanilla-extract/css";
import { globalStyle } from "../../App.css";

export const Container = style({
  display: "inline-block",
  flexDirection: "column",

  alignItems: "center",
  boxSizing: "border-box",
  padding: "15px",
  margin: "15px",
  height: "max-content",

  backgroundColor: globalStyle.color.list,
  borderRadius: "12px",
});

export const ListTitle = style({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  // color: globalStyle.color.,
  marginBottom: "10px",
});

export const TaskWrapper = style({
  color: globalStyle.color.secondaryDarkText,
  fontSize: globalStyle.fontSizing.P1,
  fontWeight: "bold",
});
