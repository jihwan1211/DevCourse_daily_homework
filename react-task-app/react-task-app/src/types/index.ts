export interface ITask {
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskOwner: string;
}

export type TModalState = {
  boardModal: {
    boardId: string;
    listId: string;
    task: ITask;
  };

  setBoardModal: (activeBoardId: string, listId: string, newTask: ITask) => void;
  reset: () => void;
};

export interface ILogItem {
  logId: string;
  logAuthor: string;
  logMessage: string;
  logTimestamp: string;
}

export type TLoggerState = {
  logArr: ILogItem[];
  setLog: (log: ILogItem) => void;
};

//-----

export type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
  setModalActiveStatus: (status: boolean) => void;
  setBoard: (board: IBoard) => void;
  deleteBoard: (activeBoardId: string) => void;
  setNewTask: (activeBoardId: string, listId: string, newTask: ITask) => void;
  deleteTask: (activeBoardId: string, listId: string, taskId: string) => void;
  modifyTask: (activeBoardId: string, listId: string, taskId: string, newTask: ITask) => void;
  setNewList: (activeBoardId: string, newList: IList) => void;
  deleteList: (activeBoardId: string, listId: string) => void;
  dragDropTask: (activeBoardId: string, source: { droppableId: string; index: number }, destination: { droppableId: string; index: number }) => void;
};

export interface IBoard {
  boardId: string;
  boardName: string;
  lists: IList[];
}

export interface IList {
  listId: string;
  listName: string;
  tasks: ITask[];
}

export type TUserState = {
  email: string;
  id: string;
  setUser: (email: string, id: string) => void;
  resetUser: () => void;
};
