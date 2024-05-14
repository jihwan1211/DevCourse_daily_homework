export interface ITask {
  taskId: string;
  taskName: string;
  taskDescription: string;
  taskOwner: string;
}

export type ModalState = {
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

export type loggerState = {
  logArr: ILogItem[];
};

export type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
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

// ini
// export type BoardState = {
//   modalActive: false;
//   boradArray: [
//     list: [
//       task: [
//         {
//           taskId: "list-0";
//           taskName: "Task 1";
//           taskDescription: "Description";
//           taskOwner: "John";
//         },
//         {
//           taskId: "list-1";
//           taskName: "Task 2";
//           taskDescription: "Description 2";
//           taskOwner: "Kim";
//         }
//       ]
//     ]
//   ];
// };
