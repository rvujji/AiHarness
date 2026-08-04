import { ReviewType } from "./ReviewType.js";

export interface ReviewScore {

    reviewer: ReviewType;

    score: number;

    reason: string;

}