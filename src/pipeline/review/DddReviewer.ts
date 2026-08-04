import type { PromptTask }
    from "../../contracts/PromptTask.js";

import type { GenerationResult }
    from "../../contracts/GenerationResult.js";

import type { ReviewReport }
    from "../../contracts/ReviewReport.js";

import type { ReviewRequest }
    from "../../contracts/ReviewRequest.js";

import { BaseReviewer }
    from "./BaseReviewer.js";
import { ReviewFinding } from "../../contracts/ReviewFinding.js";

export class DddReviewer
    extends BaseReviewer {

    protected buildTask(
        request: ReviewRequest
    ): PromptTask {

        return {

            goal:
                "Review the supplied artifact for Domain-Driven Design correctness.",

            output:
                "DDD Review Report",

            constraints: [

                "Follow Domain Model.",

                "Respect Aggregate boundaries.",

                "Respect ownership direction.",

                "Respect domain invariants."

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
                "DDD Reviewer",

            summary:
                result.inference.response,

            findings

        };

    }

}