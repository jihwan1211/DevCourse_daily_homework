import { style } from "@vanilla-extract/css";
import { globalStyle } from "../../../App.css";

export const Container = style({
  margin: globalStyle.spacing.big2,
  cursor: "pointer",
});

export const FormWrapper = style({
  display: "flex",
});

export const SVGStyle = style({
  margin: globalStyle.spacing.small,
  color: "black",
});

export const SVGWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
