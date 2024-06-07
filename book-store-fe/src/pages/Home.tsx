import styled from "styled-components";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";

export default function Home() {
  return (
    <>
      <Title size="large" color="secondary">
        제목 테스트
      </Title>
      <Button size="large" scheme="normal">
        버튼 테스트
      </Button>
      <InputText placeholder="abc"></InputText>
      <h1>book store home</h1>
    </>
  );
}
