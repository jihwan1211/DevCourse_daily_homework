import { create } from "zustand";
import { createBoardSlice } from "./slices/boardSlice";
import { createLoggerSlice } from "./slices/loggerSlice";
import { createModalSlice } from "./slices/modalSlice";
import { IBoard, ILogItem, ITask, TBoardState, TLoggerState, TModalState } from "../types";

export const useBoundStore = create<TBoardState & TLoggerState & TModalState>()((...a) => ({
  ...createBoardSlice(...a),
  ...createLoggerSlice(...a),
  ...createModalSlice(...a),
}));
