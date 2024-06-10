import { setupWorker } from "msw/browser";
import { reviewsById, addReview } from "./review";

const handlers = [reviewsById, addReview];

export const worker = setupWorker(...handlers);
