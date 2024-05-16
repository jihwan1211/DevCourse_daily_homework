import { IList } from "../../types";
import { Container } from "./List.css";
import Task from "../Task/Task";
import { ListTitle, TaskWrapper, NewTaskUpload, NewTask } from "./List.css";
import { CgAddR } from "react-icons/cg";
type Prop = {
  list: IList;
};

export default function List({ list }: Prop) {
  return (
    <div className={Container}>
      <div className={ListTitle}>{list.listName}</div>
      <div className={TaskWrapper}>
        {list.tasks.map((task) => (
          <Task task={task} />
        ))}
      </div>
      <div className={NewTaskUpload}>
        <CgAddR />
        <span className={NewTask}>새로운 일 등록</span>
      </div>
    </div>
  );
}
