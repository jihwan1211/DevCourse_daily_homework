import { ILogItem, TBoardState, TLoggerState, TModalState } from "../../types";
import { StateCreator } from "zustand";

// type loggerState = {
//   logArr: ILogItem[];
// };

// const initialState: loggerState = {
//   logArr: [],
// };

export const createLoggerSlice: StateCreator<TBoardState & TLoggerState & TModalState, [], [], TLoggerState> = (set) =>
  ({
    logArr: [{ logId: "logid", logAuthor: "me", logMessage: "meme", logTimestamp: "meme" }],
    setLog: (log: ILogItem) => set((state) => ({ logArr: [...state.logArr, log] })),
  } as TLoggerState);
