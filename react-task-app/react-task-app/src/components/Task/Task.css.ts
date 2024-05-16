import { style } from "@vanilla-extract/css";
import { globalStyle } from "../../App.css";

export const TaskWrapper = style({
  width: "200px",
  height: "50px",
  marginBottom: "5px",
  borderRadius: "12px",
  backgroundColor: globalStyle.color.task,
  padding: "12px",
  ":hover": {
    backgroundColor: globalStyle.color.taskHover,
  },
  cursor: "pointer",
});

export const TaskTitle = style({
  color: "black",
  width: "100%",
  boxSizing: "border-box",
  fontWeight: "bold",
});

export const TaskDescription = style({
  marginTop: "15px",
  //   color : globalStyle.color.
});
