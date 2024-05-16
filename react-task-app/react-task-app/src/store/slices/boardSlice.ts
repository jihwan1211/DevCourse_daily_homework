import { IBoard, TBoardState, TLoggerState, TModalState } from "../../types";
import { StateCreator } from "zustand";

// type IBoardState = {
//   modalActive: boolean;
//   boardArray: IBoard[];
// };

type Action = {
  setBoard: (board: IBoard) => void;
};

export const createBoardSlice: StateCreator<TBoardState & TLoggerState & TModalState, [], [], TBoardState> = (set) => ({
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "첫 번재 보드여",
      lists: [
        {
          listId: "list-0",
          listName: "listName - 0",
          tasks: [
            { taskId: "task-0", taskName: "task-0 이름", taskDescription: "task-0 상세", taskOwner: "me" },
            { taskId: "task-1", taskName: "task-1 이름", taskDescription: "task-1 상세", taskOwner: "me" },
          ],
        },
        {
          listId: "list-1",
          listName: "listName - 1",
          tasks: [
            { taskId: "task-0", taskName: "task-0 이름", taskDescription: "task-0 상세", taskOwner: "me" },
            { taskId: "task-1", taskName: "task-1 이름", taskDescription: "task-1 상세", taskOwner: "me" },
          ],
        },
      ],
    },
    {
      boardId: "board-1",
      boardName: "두 번재 보드여",
      lists: [],
    },
  ],
  setBoard: (board: IBoard) => set((state) => ({ boardArray: [...state.boardArray, board] })),
});
