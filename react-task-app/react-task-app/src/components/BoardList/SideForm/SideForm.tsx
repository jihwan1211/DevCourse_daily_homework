import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { CiCircleRemove } from "react-icons/ci";
import { Container, FormWrapper, SVGStyle, SVGWrapper } from "./SidForm.css";
import { useBoundStore } from "../../../store";

export default function SideForm() {
  const [isSideFormOpened, setIsSideFormOpened] = useState(false);
  const [boardName, setBoardName] = useState("");
  const setBoard = useBoundStore((state) => state.setBoard);

  const onClickSideForm: MouseEventHandler<SVGElement> = () => {
    setIsSideFormOpened(!isSideFormOpened);
  };

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setBoard({ boardId: "board-2", boardName: boardName, lists: [] });
    setBoardName("");
  };

  const onChangeBoardName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setBoardName(e.target.value);
  };
  return (
    <div className={Container}>
      {isSideFormOpened ? (
        <div className={FormWrapper}>
          <form onSubmit={onSubmitForm}>
            <input type="text" value={boardName} autoFocus onChange={onChangeBoardName}></input>
          </form>
          <div className={SVGWrapper}>
            <CiCircleRemove className={SVGStyle} onClick={onClickSideForm} />
          </div>
        </div>
      ) : (
        <div className={SVGWrapper}>
          <CgAdd className={SVGStyle} onClick={onClickSideForm} />
        </div>
      )}
    </div>
  );
}
