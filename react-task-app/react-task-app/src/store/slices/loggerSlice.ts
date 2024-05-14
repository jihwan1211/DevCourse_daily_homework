import { ILogItem, TBoardState, TLoggerState, TModalState } from "../../types";
import { StateCreator } from "zustand";

// type loggerState = {
//   logArr: ILogItem[];
// };

// const initialState: loggerState = {
//   logArr: [],
// };

export const createLoggerSlice: StateCreator<TBoardState & TLoggerState & TModalState, [], [], TLoggerState> = () => ({} as TLoggerState);
