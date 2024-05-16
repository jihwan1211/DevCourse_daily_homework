import { style } from "@vanilla-extract/css";
import { globalStyle } from "../../App.css";

export const Container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box",
  padding: "15px",
  margin: "15px",

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
  // selectors: {
  //   "span > &": {
  //     marginLeft: "5px",
  //   },
  // },
  ":hover": {
    backgroundColor: globalStyle.color.secondaryDarkTextHover,
  },
});

export const NewTask = style({
  marginLeft: "5px",
});
