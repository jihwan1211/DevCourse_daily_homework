import { create } from "zustand";
import { createBoardSlice } from "./slices/boardSlice";
import { createLoggerSlice } from "./slices/loggerSlice";
import { createModalSlice } from "./slices/modalSlice";
import { createUserSlice } from "./slices/userSlice";
import { TBoardState, TLoggerState, TModalState, TUserState } from "../types";

export const useBoundStore = create<TBoardState & TLoggerState & TModalState & TUserState>()((...a) => ({
  ...createBoardSlice(...a),
  ...createLoggerSlice(...a),
  ...createModalSlice(...a),
  ...createUserSlice(...a),
}));
