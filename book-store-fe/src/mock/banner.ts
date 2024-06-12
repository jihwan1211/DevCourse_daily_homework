import { BookReviewItem } from "@/models/book.model";
import { HttpResponse, http } from "msw";
import { fakerKO as faker } from "@faker-js/faker";
import { Banner } from "@/models/banner.model";

const data: Banner[] = [
  {
    id: 1,
    title: "배너 1 제목",
    description: "Banner 1 desc",
    image: "https://picsum.photos/id/111/1200/400",
    url: "http://some.url",
    target: "_blank",
  },
  {
    id: 2,
    title: "배너 2 제목",
    description: "Banner 1 desc",
    image: "https://picsum.photos/id/222/1200/400",
    url: "http://some.url",
    target: "_blank",
  },
  {
    id: 2,
    title: "배너 2 제목",
    description: "Banner 1 desc",
    image: "https://picsum.photos/id/333/1200/400",
    url: "http://some.url",
    target: "_self",
  },
];

export const banners = http.get("/banners", () => {
  return HttpResponse.json(data, { status: 200 });
});
