import Title from "./Title";
import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe("랜더를 확인", () => {
  it("title 컴포넌트 렌더링", () => {
    render(
      <BookStoreThemeProvider>
        <Title size="large">제목</Title>
      </BookStoreThemeProvider>
    );
    expect(screen.getByText("제목")).toBeInTheDocument();
  });
});
