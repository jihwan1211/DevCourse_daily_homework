import { ChangeEventHandler, FormEvent, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

type Todo = {
  id: number;
  content: string;
  done: boolean;
};

export default function Todo() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodoList([...todoList, { id: todoList.length, content: todoInput, done: false }]);
    setTodoInput("");
  };

  const onChangeTodoInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodoInput(e.target.value);
  };

  const onClickDeleteButton = (id: number) => {
    setTodoList((prev) => {
      return prev.filter((ele) => ele.id !== id);
    });
  };

  const onChangeCheckBox = (id: number) => {
    setTodoList((prev) => {
      return prev.map((ele) => {
        if (ele.id === id) {
          return { ...ele, done: !ele.done };
        }
        return ele;
      });
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <h1>todo</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="input" value={todoInput} onChange={onChangeTodoInput} placeholder="할 일 입력"></input>
        <button type="submit">입력</button>
      </form>
      <div>
        {todoList.map((ele, idx) => {
          return (
            <TodoDisplay key={idx}>
              <input type="checkbox" name="doneFlag" onChange={() => onChangeCheckBox(ele.id)} />
              <TodoContent onClick={openModal} $isDone={ele.done}>
                {ele.content}
              </TodoContent>
              {isModalOpen && <Modal setModal={setIsModalOpen} todo={ele} />}
              <button onClick={() => onClickDeleteButton(ele.id)}>삭제</button>
            </TodoDisplay>
          );
        })}
      </div>
    </>
  );
}

const TodoDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TodoContent = styled.div<{ $isDone?: boolean }>`
  text-decoration: ${(props) => (props.$isDone ? "line-through" : "none")};

  cursor: pointer;
`;
