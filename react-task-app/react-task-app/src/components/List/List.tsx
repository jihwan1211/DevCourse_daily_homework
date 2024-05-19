import { IList } from "../../types";
import { Container } from "./List.css";
import Task from "../Task/Task";
import { ListTitle, TaskWrapper } from "./List.css";
import ActionButton from "../ActionButton/ActionButton";

type Prop = {
  list: IList;
  activeBoardId: string;
};

export default function List({ list, activeBoardId }: Prop) {
  console.log(list.listId, list.tasks.length);
  return (
    <div className={Container}>
      <div className={ListTitle}>{list.listName}</div>
      <div className={TaskWrapper}>
        {list.tasks.map((task) => (
          <Task key={task.taskId} task={task} />
        ))}
      </div>
      <ActionButton listId={list.listId} activeBoardId={activeBoardId} />
    </div>
  );
}
