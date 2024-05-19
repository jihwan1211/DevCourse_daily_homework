import { useBoundStore } from "../../store";
import List from "../List/List";
import { Container } from "./ListsContainer.css";
import ActionButton from "../ActionButton/ActionButton";

type Prop = {
  activeBoardId: string;
};

export default function ListsContainer({ activeBoardId }: Prop) {
  const boards = useBoundStore((state) => state.boardArray);
  const lists = boards.filter((board) => board.boardId === activeBoardId)?.at(0)?.lists;

  return (
    <div className={Container}>
      {lists?.map((list) => (
        <List key={list.listId} list={list} activeBoardId={activeBoardId} />
      ))}
      <ActionButton listId={""} activeBoardId={activeBoardId} />
    </div>
  );
}
