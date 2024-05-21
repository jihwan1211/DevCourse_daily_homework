import { useState } from "react";
import { appContainer, board, buttons, Button } from "./App.css";
import BoardList from "./components/BoardList/BoardList";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useBoundStore } from "./store";
import EditModal from "./components/EditModal/EditModal";
import LoggerModal from "./components/LoggerModal/LoggerModal";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  const isModalActive = useBoundStore((state) => state.modalActive);
  const deleteBoard = useBoundStore((state) => state.deleteBoard);
  const boardArray = useBoundStore((state) => state.boardArray);
  const boardModal = useBoundStore((state) => state.boardModal);
  const setModalActiveStatus = useBoundStore((state) => state.setModalActiveStatus);
  const dragDropTask = useBoundStore((state) => state.dragDropTask);
  const setLog = useBoundStore((state) => state.setLog);

  const onClickDeleteBoard = () => {
    deleteBoard(activeBoardId);

    const findNewActiveBoardId = () => {
      const index = boardArray.findIndex((board) => board.boardId === activeBoardId);
      if (index === 0) return 1;
      return index - 1;
    };
    setActiveBoardId(boardArray[findNewActiveBoardId()].boardId);
  };

  const onClickShowLogger = () => {
    setModalActiveStatus(true);
  };

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;
    dragDropTask(activeBoardId, source, destination);
    setLog({
      logId: uuidv4(),
      logAuthor: "me",
      logMessage: `${source.droppableId}리스트에서 index : ${source.index}가 ${destination.droppableId}리스트의 index : ${destination.index}로 이동`,
      logTimestamp: String(new Date()),
    });
  };

  return (
    <div className={appContainer}>
      <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />
      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListsContainer activeBoardId={activeBoardId} />
        </DragDropContext>
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
