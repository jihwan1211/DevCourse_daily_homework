import { ITask, TBoardState, TLoggerState, TModalState } from "../../types";
import { StateCreator } from "zustand";

// const initialState: ModalState = {
//   boardId: "",
//   listId: "",
//   task: {} as ITask,
// };

export const createModalSlice: StateCreator<TBoardState & TLoggerState & TModalState, [], [], TModalState> = () => ({} as TModalState);
