import type { ReviewFinding }
    from "./ReviewFinding.js";

export interface ReviewReport {

    reviewer: string;

    summary: string;

    findings: ReviewFinding[];

}