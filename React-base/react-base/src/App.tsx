import styled from "styled-components";
import Todo from "./components/Todo";
import Clock from "./components/Clock";

function App() {
  return (
    <Container>
      <Todo />
      <Clock />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default App;
