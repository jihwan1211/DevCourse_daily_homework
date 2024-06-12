import { BookReviewItem, BookReviewItemWrite } from "@/models/book.model";
import { requestHandler } from "./http";
import { httpClient } from "./http";

export const fetchBookReview = async (bookId: string) => {
  const response = await httpClient.get<BookReviewItem[]>(`/reviews/${bookId}`);
  return response.data;
  //   return await requestHandler<BookReviewItem[]>("get", `/reviews/${bookId}`);
};

export const addBookReview = async (bookId: string, data: BookReviewItemWrite) => {
  const response = await httpClient.post<BookReviewItem[]>(`/reviews/${bookId}`);
  return response.data;
};

export const fetchReviewAll = async () => {
  const response = await httpClient.get<BookReviewItem[]>(`/reviews`);
  return response.data;
};
