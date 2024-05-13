import styled from "styled-components";

type Todo = {
  id: number;
  content: string;
  done: boolean;
};

type Props = {
  todo: Todo;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ setModal, todo }: Props) {
  const onClickBackButton = () => {
    setModal(false);
  };
  return (
    <Background>
      <Container>
        <button onClick={onClickBackButton}>
          <svg viewBox="0 0 24 24" aria-hidden="true" height={20} width={20}>
            <g>
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </g>
          </svg>
        </button>
        <div>
          <span>할일 : </span>
          {todo.content}
        </div>
      </Container>
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(15, 20, 25, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgb(255, 255, 255);
  & > svg {
    fill: rgb(9, 21, 34);
  }

  & > button {
    position: absolute;
    top: 10px;
    left: 10px;
    svg {
      fill: rgb(9, 21, 34);
    }
  }
`;
