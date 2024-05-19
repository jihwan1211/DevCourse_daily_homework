import { useState } from "react";
import { CgAddR } from "react-icons/cg";
import { NewTaskUpload, NewTask, Container, Span } from "./ActionButtom.css";
import DropDownForm from "./DropDownForm/DropDowmForm";

type Prop = {
  listId: string;
  activeBoardId: string;
};

export default function ActionButton({ listId, activeBoardId }: Prop) {
  const [isNewTaskCliked, setIsNewTaskClicked] = useState(false);

  const onClickNewTask = () => {
    setIsNewTaskClicked(true);
  };

  return isNewTaskCliked ? (
    <DropDownForm listId={listId} activeBoardId={activeBoardId} setIsNewTaskClicked={setIsNewTaskClicked} />
  ) : listId.length === 0 ? (
    <div className={Container} onClick={onClickNewTask}>
      <CgAddR />
      <span className={Span}>새로운 리스트 추가</span>
    </div>
  ) : (
    <div className={NewTaskUpload} onClick={onClickNewTask}>
      <CgAddR />
      <span className={NewTask}>새로운 일 등록</span>
    </div>
  );
}
