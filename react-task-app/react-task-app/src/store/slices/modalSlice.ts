import { ITask, TBoardState, TLoggerState, TModalState, ILogItem, TUserState } from "../../types";
import { StateCreator } from "zustand";

export const createModalSlice: StateCreator<TBoardState & TLoggerState & TModalState & TUserState, [], [], TModalState> = (set) => ({
  boardModal: { boardId: "", listId: "", task: {} as ITask },
  loggerModal: { logArr: [] },
  setBoardModal: (activeBoardId: string, listId: string, newTask: ITask) => set(() => ({ boardModal: { boardId: activeBoardId, listId: listId, task: { ...newTask } } })),
  reset: () => set(() => ({ boardModal: { boardId: "", listId: "", task: {} as ITask }, loggerModal: { logArr: [] } })),
});
