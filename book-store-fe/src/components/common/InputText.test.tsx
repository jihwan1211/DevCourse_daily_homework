import InputText from "./InputText";
import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";
import React from "react";

describe("input text을 확인", () => {
  it("input text 렌더링", () => {
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="abc" />
      </BookStoreThemeProvider>
    );
    expect(screen.getByPlaceholderText("abc")).toBeInTheDocument();
  });

  it("forward ref test", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(
      <BookStoreThemeProvider>
        <InputText placeholder="abc" ref={ref} />
      </BookStoreThemeProvider>
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
