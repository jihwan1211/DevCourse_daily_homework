import { useState } from "react";
import { CgAddR } from "react-icons/cg";
import { Container, Span, NewList } from "./ActionButtom.css";
import DropDownForm from "./DropDownForm/DropDowmForm";
import clsx from "clsx";

type Prop = {
  listId: string;
  activeBoardId: string;
};

export default function ActionButton({ listId, activeBoardId }: Prop) {
  const [isNewTaskCliked, setIsNewTaskClicked] = useState(false);
  const buttonText = listId.length ? "새로운 일 등록" : "새로운 리스트 추가";

  const onClickNewTask = () => {
    setIsNewTaskClicked(true);
  };

  return isNewTaskCliked ? (
    <DropDownForm listId={listId} activeBoardId={activeBoardId} setIsNewTaskClicked={setIsNewTaskClicked} />
  ) : (
    <div className={clsx({ [Container]: listId.length !== 0 }, { [NewList]: listId.length === 0 })} onClick={onClickNewTask}>
      <CgAddR />
      <span className={Span}>{buttonText}</span>
    </div>
  );
}
