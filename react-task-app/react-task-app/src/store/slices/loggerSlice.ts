import { ILogItem, TBoardState, TLoggerState, TModalState, TUserState } from "../../types";
import { StateCreator } from "zustand";

export const createLoggerSlice: StateCreator<TBoardState & TLoggerState & TModalState & TUserState, [], [], TLoggerState> = (set) => ({
  logArr: [{ logId: "logid", logAuthor: "me", logMessage: "meme", logTimestamp: "meme" }],
  setLog: (log: ILogItem) => set((state) => ({ logArr: [...state.logArr, log] })),
});
