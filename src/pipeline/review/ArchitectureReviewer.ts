import { GenerationResult } from "../../contracts/GenerationResult.js";
import { PromptTask } from "../../contracts/PromptTask.js";
import { ReviewFinding } from "../../contracts/ReviewFinding.js";
import { ReviewReport } from "../../contracts/ReviewReport.js";
import { ReviewRequest } from "../../contracts/ReviewRequest.js";
import { BaseReviewer } from "./BaseReviewer.js";

export class ArchitectureReviewer
    extends BaseReviewer {

    protected buildTask(
        request: ReviewRequest
    ): PromptTask {

        return {

            goal:
                "Review the supplied artifact for architectural correctness.",

            output:
                "Architecture Review Report",

            constraints: [

                "Follow Platform Architecture.",

                "Follow Domain Model.",

                "Follow Constitution."

            ]

        };

    }

    protected buildReport(

        request: ReviewRequest,

        result: GenerationResult,

        findings: ReviewFinding[]

    ): ReviewReport {

        return {

            reviewer:
                "Architecture Reviewer",

            summary:
                result.inference.response,

            findings

        };

    }

}