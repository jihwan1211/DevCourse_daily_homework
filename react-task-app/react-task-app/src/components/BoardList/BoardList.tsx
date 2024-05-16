import SideForm from "./SideForm/SideForm";
import { Container, LeftWrapper, BoardTitle, BoardListStyle, SideFormWarpper, ActiveBoard } from "./BoardList.css";
import { useBoundStore } from "../../store";
import clsx from "clsx";

type Props = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

export default function BoardList({ activeBoardId, setActiveBoardId }: Props) {
  const boardArr = useBoundStore((state) => state.boardArray);

  return (
    <div className={Container}>
      <div className={LeftWrapper}>
        <div className={BoardTitle}>게시판</div>
        {boardArr.map((board) => (
          <div key={board.boardId} className={clsx(BoardListStyle, { [ActiveBoard]: activeBoardId === board.boardId })} onClick={() => setActiveBoardId(board.boardId)}>
            <div>{board.boardName}</div>
          </div>
        ))}
      </div>
      <div className={SideFormWarpper}>
        <SideForm />
      </div>
    </div>
  );
}
