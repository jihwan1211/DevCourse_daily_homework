import { BookReviewItem } from "@/models/book.model";
import { HttpResponse, http } from "msw";
import { fakerKO as faker } from "@faker-js/faker";

const mockReviewsData: BookReviewItem[] = Array.from({ length: 8 }).map((_, index) => ({
  id: index,
  userName: faker.person.firstName(),
  content: faker.lorem.paragraph(),
  createdAt: faker.date.past().toISOString(),
  score: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
}));

export const reviewsById = http.get(`/reviews/:bookId`, () => {
  return HttpResponse.json(mockReviewsData, {
    status: 200,
  });
});

export const addReview = http.post(`/reviews/:bookId`, () => {
  return HttpResponse.json({}, { status: 200 });
});

export const reviewForMain = http.get("/reviews", () => {
  return HttpResponse.json(mockReviewsData, {
    status: 200,
  });
});
