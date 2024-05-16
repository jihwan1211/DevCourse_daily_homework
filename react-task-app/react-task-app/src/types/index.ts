export interface ITask {
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskOwner: string;
}

export type TModalState = {
  boardId: string;
  listId: string;
  task: ITask;
};

export interface ILogItem {
  logId: string;
  logAuthor: string;
  logMessage: string;
  logTimestamp: string;
}

export type TLoggerState = {
  logArr: ILogItem[];
};

//-----

export type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
  setBoard: (board: IBoard) => void;
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
