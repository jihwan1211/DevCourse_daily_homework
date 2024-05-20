import { style } from "@vanilla-extract/css";
import { globalStyle } from "../../App.css";
export const Container = style({
  position: "absolute",
  width: "100dvw",
  height: "100dvh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Wrapper = style({
  width: 700,
  height: "max-content",
  backgroundColor: globalStyle.color.mainDarker,
  borderRadius: "12px",
  boxSizing: "border-box",
  padding: 15,
});

export const Header = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

export const Cancle = style({
  cursor: "pointer",
});

export const Main = style({
  width: "100%",
  height: "max-content",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  padding: 15,
});

export const Info = style({
  boxSizing: "border-box",
  width: "100%",
  backgroundColor: "white",
  padding: 5,
  borderRadius: 5,
  border: "none",
});

export const Title = style({
  marginTop: 10,
});

export const ButtonWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
});

export const Button = style({
  border: "none",
  padding: 10,
  cursor: "pointer",
});
