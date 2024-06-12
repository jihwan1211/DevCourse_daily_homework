import { setupWorker } from "msw/browser";
import { reviewsById, addReview, reviewForMain } from "./review";
import { bestBooks } from "./books";
import { banners } from "./banner";

const handlers = [reviewsById, addReview, reviewForMain, bestBooks, banners];

export const worker = setupWorker(...handlers);
