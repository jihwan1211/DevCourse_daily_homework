import { Book } from "@/models/book.model";
import styled from "styled-components";
import BooksBestItem from "../Books/BooksBestItem";

interface Props {
  books: Book[];
}

export default function MainBestBooks({ books }: Props) {
  return (
    <MainBestBooksStyle>
      {books.map((book, index) => (
        <BooksBestItem key={book.id} book={book} itemIndex={index} />
      ))}
    </MainBestBooksStyle>
  );
}

const MainBestBooksStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
`;
