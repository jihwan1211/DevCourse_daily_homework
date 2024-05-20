import { style } from "@vanilla-extract/css";
import { globalStyle } from "../../App.css";

export const Container = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "max-content",

  backgroundColor: globalStyle.color.mainDarker,
});

export const LeftWrapper = style({
  display: "flex",
  alignItems: "center",
  flexGrow: "1",
});

export const BoardTitle = style({
  font: globalStyle.font.body,
  fontSize: globalStyle.fontSizing.T1,
  margin: `0 ${globalStyle.spacing.listSpacing}`,
  color: "white",
});

export const BoardListStyle = style({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  height: "40px",
  padding: "12px",
  cursor: "pointer",
  margin: `0 ${globalStyle.spacing.medium}`,
  backgroundColor: globalStyle.color.main,
  borderRadius: "12px",
  color: "white",
});

export const SideFormWarpper = style({
  display: "flex",
  justifyContent: "flex-end",
  width: "150px",
});

export const ActiveBoard = style({
  backgroundColor: globalStyle.color.secondaryDarkText,
});
