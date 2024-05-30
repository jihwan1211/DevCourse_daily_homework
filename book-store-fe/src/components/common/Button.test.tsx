import Button from "./Button";
import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe("버튼을 확인", () => {
  it("버튼 컴포넌트 렌더링", () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );
    expect(screen.getByText("버튼")).toBeInTheDocument();
  });

  it("size prop 적용", () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole("button")).toHaveStyle({ fontSize: "1.5rem" });
  });
});
