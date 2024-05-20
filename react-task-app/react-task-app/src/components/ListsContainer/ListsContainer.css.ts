import { style } from "@vanilla-extract/css";
import { globalStyle } from "../../App.css";

export const Container = style({
  height: "max-content",
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  rowGap: globalStyle.spacing.listSpacing,
  margin: globalStyle.spacing.listSpacing,
});
