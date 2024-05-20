import { ITask, TBoardState, TLoggerState, TModalState, ILogItem } from "../../types";
import { StateCreator } from "zustand";

type TBoardModal = {
  boardId: string;
  listId: string;
  task: ITask;
};

export const createModalSlice: StateCreator<TBoardState & TLoggerState & TModalState, [], [], TModalState> = (set) => ({
  boardModal: { boardId: "", listId: "", task: {} as ITask },
  loggerModal: { logArr: [] },
  setBoardModal: (activeBoardId: string, listId: string, newTask: ITask) => set(() => ({ boardModal: { boardId: activeBoardId, listId: listId, task: { ...newTask } } })),
  setLoggerModal: (logArr: ILogItem[]) => set(() => ({ loggerModal: { logArr: [...logArr] } })),
  reset: () => set(() => ({ boardModal: { boardId: "", listId: "", task: {} as ITask }, loggerModal: { logArr: [] } })),
});
