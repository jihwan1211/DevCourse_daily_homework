import { useState } from "react";
import { appContainer, board, buttons } from "./App.css";
import BoardList from "./components/BoardList/BoardList";
import ListsContainer from "./components/ListsContainer/ListsContainer";

function App() {
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  console.log(activeBoardId);
  return (
    <div className={appContainer}>
      <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />
      <div className={board}>
        <ListsContainer activeBoardId={activeBoardId} />
      </div>
      <div className={buttons}>
        <button></button>
        <button></button>
      </div>
    </div>
  );
}

export default App;
