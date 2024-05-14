import { IBoard, TBoardState, TLoggerState, TModalState } from "../../types";
import { State, StateCreator } from "zustand";

// type IBoardState = {
//   modalActive: boolean;
//   boardArray: IBoard[];
// };

// const initialState: IBoardState = {
//   modalActive: false,
//   boardArray: [],
// };

export const createBoardSlice: StateCreator<TBoardState & TLoggerState & TModalState, [], [], TBoardState> = () => ({} as TBoardState);
