import { useState } from "react";
import { useBoundStore } from "../../store";
import { Container, Wrapper, Header, Main, Info, Title, ButtonWrapper, Button, Cancle } from "./EditModal.css";
import { BsXLg } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

export default function EditModal() {
  const boardModal = useBoundStore((state) => state.boardModal);
  const modalReset = useBoundStore((state) => state.reset);
  const deleteTask = useBoundStore((state) => state.deleteTask);
  const setModalActiveStatus = useBoundStore((state) => state.setModalActiveStatus);
  const modifyTask = useBoundStore((state) => state.modifyTask);
  const setLog = useBoundStore((state) => state.setLog);

  const [title, setTitle] = useState(boardModal.task.taskName);
  const [description, setDescription] = useState(boardModal.task.taskDescription);
  const [owner, setOwner] = useState(boardModal.task.taskOwner);

  const onClickDeleteTask = () => {
    deleteTask(boardModal.boardId, boardModal.listId, boardModal.task.taskId);
    setModalActiveStatus(false);
    setLog({ logId: uuidv4(), logAuthor: "me", logMessage: `${boardModal.task.taskName} 할 일이 삭제되었습니다`, logTimestamp: String(new Date()) });
    modalReset();
  };

  const onClickModifyTask = () => {
    modifyTask(boardModal.boardId, boardModal.listId, boardModal.task.taskId, { taskId: boardModal.task.taskId, taskName: title, taskDescription: description, taskOwner: owner });
    setModalActiveStatus(false);
    setLog({ logId: uuidv4(), logAuthor: "me", logMessage: `${boardModal.task.taskName} 할 일이 수정되었습니다`, logTimestamp: String(new Date()) });
    modalReset();
  };

  return (
    <div className={Container}>
      <div className={Wrapper}>
        <div className={Header}>
          <div>{boardModal.task.taskName}</div>
          <BsXLg
            className={Cancle}
            onClick={() => {
              setModalActiveStatus(false);
              modalReset();
            }}
          />
        </div>
        <div className={Main}>
          <div className={Title}>제목</div>
          <input className={Info} value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className={Title}>설명</div>
          <input className={Info} value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className={Title}>생성한 사람</div>
          <input className={Info} value={owner} onChange={(e) => setOwner(e.target.value)} />
        </div>
        <div className={ButtonWrapper}>
          <button className={Button} onClick={onClickModifyTask}>
            일 수정하기
          </button>
          <button className={Button} onClick={onClickDeleteTask}>
            일 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
