import styled from "styled-components";
import Title from "../components/common/Title";
import BooksFilter from "../components/Books/BooksFilter";
import BooksViewSwitcher from "../components/Books/BooksViewSwitcher";
import Pagination from "../components/Books/Pagination";
import BooksList from "../components/Books/BooksList";
import BooksEmpty from "../components/Books/BooksEmpty";
import { useBooks } from "../hooks/useBooks";
import Loading from "@/components/common/Loading";

export default function Books() {
  const { books, pagination, isEmpty, isBooksLoading } = useBooks();

  if (isEmpty) return <BooksEmpty />;
  if (isBooksLoading) return <Loading />;
  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BookStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        {books && <BooksList books={books} />}
        {pagination && <Pagination pagination={pagination} />}
      </BookStyle>
    </>
  );
}

const BookStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;
