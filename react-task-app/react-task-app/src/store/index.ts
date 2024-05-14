import { create } from "zustand";
import { createBoardSlice } from "./slices/boardSlice";
import { createLoggerSlice } from "./slices/loggerSlice";
import { createModalSlice } from "./slices/modalSlice";
import { IBoard, ILogItem, ITask } from "../types";

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TLoggerState = {
  logArr: ILogItem[];
};

type TModalState = {
  boardId: string;
  listId: string;
  task: ITask;
};

export const useBoundStore = create<TBoardState & TLoggerState & TModalState>()((...a) => ({
  ...createBoardSlice(...a),
  ...createLoggerSlice(...a),
  ...createModalSlice(...a),
}));
