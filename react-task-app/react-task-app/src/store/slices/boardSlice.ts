import { IBoard, ITask, TBoardState, TLoggerState, TModalState, IList, TUserState } from "../../types";
import { StateCreator } from "zustand";

export const createBoardSlice: StateCreator<TBoardState & TLoggerState & TModalState & TUserState, [], [], TBoardState> = (set) => ({
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
            { taskId: "task-2", taskName: "task-2 이름", taskDescription: "task-2 상세", taskOwner: "me" },
          ],
        },
        {
          listId: "list-1",
          listName: "listName - 1",
          tasks: [
            { taskId: "task-00", taskName: "task-0 이름", taskDescription: "task-0 상세", taskOwner: "me" },
            { taskId: "task-11", taskName: "task-1 이름", taskDescription: "task-1 상세", taskOwner: "me" },
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
  dragDropTask: (activeBoardId: string, source: { droppableId: string; index: number }, destination: { droppableId: string; index: number }) =>
    set((state) => {
      const shallow = { ...state };
      shallow.boardArray = [...state.boardArray];
      const targetBoardIndex = state.boardArray.findIndex((board) => board.boardId === activeBoardId);
      if (targetBoardIndex !== -1) {
        shallow.boardArray[targetBoardIndex] = { ...state.boardArray[targetBoardIndex] };
        shallow.boardArray[targetBoardIndex].lists = [...state.boardArray[targetBoardIndex].lists];

        const sourceListIndex = state.boardArray[targetBoardIndex].lists.findIndex((list) => list.listId === source.droppableId);
        const destinationListIndex = state.boardArray[targetBoardIndex].lists.findIndex((list) => list.listId === destination.droppableId);

        if (sourceListIndex !== -1 && destinationListIndex !== -1) {
          const sourceListTask = [...state.boardArray[targetBoardIndex].lists[sourceListIndex].tasks];
          const destinationListTask = [...state.boardArray[targetBoardIndex].lists[destinationListIndex].tasks];

          shallow.boardArray[targetBoardIndex].lists[sourceListIndex] = { ...state.boardArray[targetBoardIndex].lists[sourceListIndex] };
          shallow.boardArray[targetBoardIndex].lists[destinationListIndex] = { ...state.boardArray[targetBoardIndex].lists[destinationListIndex] };

          const deletedTask = sourceListTask.splice(source.index, 1)[0];
          const newSourceTasks = sourceListTask.filter((task) => task.taskId !== source.droppableId);

          if (source.droppableId !== destination.droppableId) {
            destinationListTask.splice(destination.index, 0, deletedTask);
            const newDestinationTasks = [...destinationListTask];

            shallow.boardArray[targetBoardIndex].lists[sourceListIndex].tasks = [...newSourceTasks];
            shallow.boardArray[targetBoardIndex].lists[destinationListIndex].tasks = [...newDestinationTasks];
          } else {
            newSourceTasks.splice(destination.index, 0, deletedTask);

            shallow.boardArray[targetBoardIndex].lists[destinationListIndex].tasks = [...newSourceTasks];
          }
        }
      }
      return shallow;
    }),
});
