import { ChangeEventHandler, useState } from "react";
import { Container, Button } from "./DropDownForm.css";
import { useBoundStore } from "../../../store";

type Prop = {
  listId: string;
  activeBoardId: string;
  setIsNewTaskClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DropDownForm({ listId, activeBoardId, setIsNewTaskClicked }: Prop) {
  console.log(activeBoardId);
  const [newTodo, setNewTodo] = useState("");
  const setNewTask = useBoundStore((state) => state.setNewTask);
  const onChangeNewTodo: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNewTodo(e.target.value);
  };
  const onClickSubmitButton = () => {
    setNewTask(activeBoardId, listId, {
      taskId: "task-new",
      taskName: "task-newName",
      taskDescription: "task-newDescription",
      taskOwner: "me",
    });
    setIsNewTaskClicked(false);
  };

  return (
    <div className={Container}>
      <textarea autoFocus placeholder="새로운 할 일을 입력하세요" rows={4} value={newTodo} onChange={onChangeNewTodo} />
      <button className={Button} onClick={onClickSubmitButton}>
        제출
      </button>
      <button onClick={() => setIsNewTaskClicked(false)}>취소</button>
    </div>
  );
}
