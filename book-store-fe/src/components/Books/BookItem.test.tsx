// import React from "react";
import { render } from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";
import { Book } from "../../models/book.model";

const dummyBook: Book = {
  id: 1,
  title: "dummy",
  img: 5,
  category_id: 1,
  summary: "dummy summary",
  author: "dummy author",
  price: 10000,
  likes: 1,
  form: "paperback",
  isbn: "dummy isbn",
  detail: "dummy Detail",
  pages: 100,
  contents: "dummy contents",
  pubDate: "2021-01-01",
};

describe("book item test", () => {
  it("render 여부", () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText("10,000원")).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.likes)).toHaveAttribute("src", `http://picsum.photos/id/${dummyBook.id}/600/600`);
  });
});
