import { IBoard, ITask, TBoardState, TLoggerState, TModalState, IList } from "../../types";
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
  setModalActiveStatus: (status: boolean) => set(() => ({ modalActive: status })),
  setBoard: (board: IBoard) => set((state) => ({ boardArray: [...state.boardArray, board] })),
  deleteBoard: (activeBoardId: string) =>
    set((state) => {
      const shallow = { ...state };
      shallow.boardArray = state.boardArray.filter((board) => board.boardId !== activeBoardId);
      console.log(shallow);
      return shallow;
    }),
  setNewTask: (activeBoardId: string, listId: string, newTask: ITask) =>
    set((state) => {
      const shallow = { ...state };
      shallow.boardArray = [...state.boardArray];

      const targetBoardIndex = state.boardArray.findIndex((board) => board.boardId === activeBoardId);

      if (targetBoardIndex !== -1) {
        shallow.boardArray[targetBoardIndex] = { ...state.boardArray[targetBoardIndex] };
        shallow.boardArray[targetBoardIndex].lists = [...state.boardArray[targetBoardIndex].lists];

        const targetListIndex = state.boardArray[targetBoardIndex].lists?.findIndex((list) => list.listId == listId);
        if (targetListIndex !== -1) {
          shallow.boardArray[targetBoardIndex].lists[targetListIndex] = { ...state.boardArray[targetBoardIndex].lists[targetListIndex] };
          shallow.boardArray[targetBoardIndex].lists[targetListIndex].tasks = [...state.boardArray[targetBoardIndex].lists[targetListIndex].tasks, newTask];
        }
      }

      return shallow;
    }),
  deleteTask: (activeBoardId: string, listId: string, taskId: string) =>
    set((state) => {
      const shallow = { ...state };
      shallow.boardArray = [...state.boardArray];
      const targetBoardIndex = state.boardArray.findIndex((board) => board.boardId === activeBoardId);

      if (targetBoardIndex !== -1) {
        shallow.boardArray[targetBoardIndex] = { ...state.boardArray[targetBoardIndex] };
        shallow.boardArray[targetBoardIndex].lists = [...state.boardArray[targetBoardIndex].lists];

        const targetListIndex = state.boardArray[targetBoardIndex].lists?.findIndex((list) => list.listId == listId);
        if (targetListIndex !== -1) {
          const newTaskArr = state.boardArray[targetBoardIndex].lists[targetListIndex].tasks.filter((task) => task.taskId !== taskId);
          shallow.boardArray[targetBoardIndex].lists[targetListIndex] = { ...state.boardArray[targetBoardIndex].lists[targetListIndex], tasks: newTaskArr };
        }
      }
      return shallow;
    }),
  modifyTask: (activeBoardId: string, listId: string, taskId: string, newTask: ITask) =>
    set((state) => {
      const shallow = { ...state };
      shallow.boardArray = [...state.boardArray];
      const targetBoardIndex = state.boardArray.findIndex((board) => board.boardId === activeBoardId);

      if (targetBoardIndex !== -1) {
        shallow.boardArray[targetBoardIndex] = { ...state.boardArray[targetBoardIndex] };
        shallow.boardArray[targetBoardIndex].lists = [...state.boardArray[targetBoardIndex].lists];

        const targetListIndex = state.boardArray[targetBoardIndex].lists?.findIndex((list) => list.listId == listId);
        if (targetListIndex !== -1) {
          shallow.boardArray[targetBoardIndex].lists[targetListIndex] = { ...state.boardArray[targetBoardIndex].lists[targetListIndex] };

          const targetTaskIndex = state.boardArray[targetBoardIndex].lists[targetListIndex].tasks.findIndex((task) => task.taskId === taskId);
          if (targetTaskIndex !== -1) {
            shallow.boardArray[targetBoardIndex].lists[targetListIndex].tasks = [...state.boardArray[targetBoardIndex].lists[targetListIndex].tasks];
            shallow.boardArray[targetBoardIndex].lists[targetListIndex].tasks[targetTaskIndex] = { ...newTask };
          }
        }
      }
      return shallow;
    }),
  setNewList: (activeBoardId: string, newList: IList) =>
    set((state) => {
      const shallow = { ...state };
      shallow.boardArray = [...state.boardArray];
      const targetBoardIndex = state.boardArray.findIndex((board) => board.boardId === activeBoardId);

      if (targetBoardIndex !== -1) {
        shallow.boardArray[targetBoardIndex] = { ...state.boardArray[targetBoardIndex] };
        shallow.boardArray[targetBoardIndex].lists = [...state.boardArray[targetBoardIndex].lists, newList];
      }
      return shallow;
    }),
  deleteList: (activeBoardId: string, listId: string) =>
    set((state) => {
      const shallow = { ...state };
      shallow.boardArray = [...state.boardArray];
      const targetBoardIndex = state.boardArray.findIndex((board) => board.boardId === activeBoardId);
      if (targetBoardIndex !== -1) {
        shallow.boardArray[targetBoardIndex] = { ...state.boardArray[targetBoardIndex] };
        const deletedList = state.boardArray[targetBoardIndex].lists.filter((list) => list.listId !== listId);
        shallow.boardArray[targetBoardIndex].lists = deletedList;
      }
      return shallow;
    }),
});
