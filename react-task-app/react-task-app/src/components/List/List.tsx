import { IList, ITask } from "../../types";
import { Container } from "./List.css";
import Task from "../Task/Task";
import { ListTitle, TaskWrapper, ListTitleWrapper, Pointer } from "./List.css";
import ActionButton from "../ActionButton/ActionButton";
import { GrSubtract } from "react-icons/gr";
import { useBoundStore } from "../../store";
import { v4 as uuidv4 } from "uuid";

type Prop = {
  list: IList;
  activeBoardId: string;
};

export default function List({ list, activeBoardId }: Prop) {
  const deleteList = useBoundStore((state) => state.deleteList);
  const setLog = useBoundStore((state) => state.setLog);
  const setBoardModal = useBoundStore((state) => state.setBoardModal);
  const setModalActiveStatus = useBoundStore((state) => state.setModalActiveStatus);
  const deleteListHandler = () => {
    deleteList(activeBoardId, list.listId);
    setLog({ logId: uuidv4(), logAuthor: "me", logMessage: `${list.listName}이 삭제됨`, logTimestamp: String(new Date()) });
  };
  const onClickOpenModal = (task: ITask) => {
    setBoardModal(activeBoardId, list.listId, task);
    setModalActiveStatus(true);
  };

  return (
    <div className={Container}>
      <div className={ListTitleWrapper}>
        <div className={ListTitle}>{list.listName}</div>
        <GrSubtract className={Pointer} onClick={deleteListHandler} />
      </div>
      <div className={TaskWrapper}>
        {list.tasks.map((task) => (
          <div onClick={() => onClickOpenModal(task)}>
            <Task key={task.taskId} task={task} />
          </div>
        ))}
      </div>
      <ActionButton listId={list.listId} activeBoardId={activeBoardId} />
    </div>
  );
}
