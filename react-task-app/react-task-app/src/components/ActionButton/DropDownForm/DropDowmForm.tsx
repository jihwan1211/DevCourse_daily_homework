import { ChangeEventHandler, useState } from "react";
import { Container, Button } from "./DropDownForm.css";
import { useBoundStore } from "../../../store";
import { v4 as uuidv4 } from "uuid";

type Prop = {
  listId: string;
  activeBoardId: string;
  setIsNewTaskClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DropDownForm({ listId, activeBoardId, setIsNewTaskClicked }: Prop) {
  const [newInput, setnewInput] = useState("");
  const setNewTask = useBoundStore((state) => state.setNewTask);
  const setNewList = useBoundStore((state) => state.setNewList);
  const setLog = useBoundStore((state) => state.setLog);
  const onChangeNewInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setnewInput(e.target.value);
  };
  const onClickSubmitButton = () => {
    if (listId.length) {
      setNewTask(activeBoardId, listId, {
        taskId: "task-new",
        taskName: newInput,
        taskDescription: "task-newDescription",
        taskOwner: "me",
      });
    } else {
      setNewList(activeBoardId, {
        listId: "list-new",
        listName: newInput,
        tasks: [],
      });
    }
    setLog({ logId: uuidv4(), logAuthor: "me", logMessage: `${newInput} ${listId.length ? "할 일이" : "리스트가"} 추가 됨`, logTimestamp: String(new Date()) });
    setIsNewTaskClicked(false);
  };

  return (
    <div className={Container}>
      <textarea autoFocus placeholder={listId.length ? "새로운 할 일을 입력하세요" : "새로운 리스트를 입력하세요"} rows={4} value={newInput} onChange={onChangeNewInput} />
      <button className={Button} onClick={onClickSubmitButton}>
        제출
      </button>
      <button onClick={() => setIsNewTaskClicked(false)}>취소</button>
    </div>
  );
}
