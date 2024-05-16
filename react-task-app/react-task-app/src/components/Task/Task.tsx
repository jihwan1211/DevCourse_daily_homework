import { ITask } from "../../types";
import { TaskWrapper, TaskTitle, TaskDescription } from "./Task.css";

type Prop = {
  task: ITask;
};

export default function Task({ task }: Prop) {
  return (
    <div className={TaskWrapper}>
      <div className={TaskTitle}>{task.taskName}</div>
      <div className={TaskDescription}>{task.taskDescription}</div>
    </div>
  );
}
