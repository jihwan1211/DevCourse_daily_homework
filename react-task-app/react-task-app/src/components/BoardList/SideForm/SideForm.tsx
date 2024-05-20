import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { CiCircleRemove } from "react-icons/ci";
import { Container, FormWrapper, SVGStyle, SVGWrapper } from "./SidForm.css";
import { useBoundStore } from "../../../store";
import { v4 as uuidv4 } from "uuid";

export default function SideForm() {
  const [isSideFormOpened, setIsSideFormOpened] = useState(false);
  const [boardName, setBoardName] = useState("");
  const setBoard = useBoundStore((state) => state.setBoard);
  const setLog = useBoundStore((state) => state.setLog);

  const onClickSideForm: MouseEventHandler<SVGElement> = () => {
    setIsSideFormOpened(!isSideFormOpened);
    setBoardName("");
  };

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setBoard({ boardId: uuidv4(), boardName: boardName, lists: [] });
    setLog({ logId: uuidv4(), logAuthor: "me", logMessage: `${boardName} 게시판 추가`, logTimestamp: String(Date.now()) });
    setBoardName("");
  };

  const onChangeBoardName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setBoardName(e.target.value);
  };

  const onBlurHandler = () => {
    setIsSideFormOpened(false);
  };

  return (
    <div className={Container}>
      {isSideFormOpened ? (
        <div className={FormWrapper}>
          <form onSubmit={onSubmitForm}>
            <input type="text" placeholder="새로운 게시판 등록하기" value={boardName} autoFocus onChange={onChangeBoardName} onBlur={onBlurHandler} />
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
