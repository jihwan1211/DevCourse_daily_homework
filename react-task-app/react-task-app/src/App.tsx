import { useState } from "react";
import { appContainer, board, buttons, Button } from "./App.css";
import BoardList from "./components/BoardList/BoardList";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useBoundStore } from "./store";
import EditModal from "./components/EditModal/EditModal";
import LoggerModal from "./components/LoggerModal/LoggerModal";

function App() {
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  const isModalActive = useBoundStore((state) => state.modalActive);
  const deleteBoard = useBoundStore((state) => state.deleteBoard);
  const boardList = useBoundStore((state) => state.boardArray);
  const boardModal = useBoundStore((state) => state.boardModal);
  const loggerModal = useBoundStore((state) => state.loggerModal);
  const setModalActiveStatus = useBoundStore((state) => state.setModalActiveStatus);
  const logArr = useBoundStore((state) => state.logArr);
  const setLoggerModal = useBoundStore((state) => state.setLoggerModal);
  console.log("boardModal : ", boardModal);
  const onClickDeleteBoard = () => {
    deleteBoard(activeBoardId);

    const findNewActiveBoardId = () => {
      const index = boardList.findIndex((board) => board.boardId === activeBoardId);
      if (index === 0) return 1;
      return index - 1;
    };
    setActiveBoardId(boardList[findNewActiveBoardId()].boardId);
  };

  const onClickShowLogger = () => {
    setModalActiveStatus(true);
  };

  return (
    <div className={appContainer}>
      <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />
      <div className={board}>
        <ListsContainer activeBoardId={activeBoardId} />
      </div>
      <div className={buttons}>
        <button className={Button} onClick={onClickDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button className={Button} onClick={onClickShowLogger}>
          활동 목록 보이기
        </button>
      </div>
      {isModalActive && boardModal.boardId?.length ? <EditModal /> : <></>}
      {isModalActive && boardModal.boardId?.length === 0 ? <LoggerModal /> : <></>}
    </div>
  );
}

export default App;
