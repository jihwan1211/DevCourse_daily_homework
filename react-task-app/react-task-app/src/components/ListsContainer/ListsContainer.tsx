import { useBoundStore } from "../../store";
import List from "../List/List";
import { Container } from "./ListsContainer.css";

type Prop = {
  activeBoardId: string;
};

export default function ListsContainer({ activeBoardId }: Prop) {
  const boards = useBoundStore((state) => state.boardArray);
  const lists = boards.filter((board) => board.boardId === activeBoardId)?.at(0)?.lists;
  console.log(lists);

  return (
    <div className={Container}>
      {lists?.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
}
