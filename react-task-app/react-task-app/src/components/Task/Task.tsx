import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../../types";
import { TaskWrapper, TaskTitle, TaskDescription } from "./Task.css";

type Prop = {
  task: ITask;
  index: number;
};

export default function Task({ task, index }: Prop) {
  return (
    <Draggable draggableId={task.taskId} index={index}>
      {(provided) => (
        <div className={TaskWrapper} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <div className={TaskTitle}>{task.taskName}</div>
          <div className={TaskDescription}>{task.taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
}
