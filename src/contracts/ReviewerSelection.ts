import { ReviewScore } from "./ReviewScore.js";
import { ReviewType } from "./ReviewType.js";

export interface ReviewerSelection {

    reviewer: ReviewType;

    confidence: number;

    reasons: string[];

    ranking: ReviewScore[];

}