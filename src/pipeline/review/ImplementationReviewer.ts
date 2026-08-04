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

export class ImplementationReviewer
    extends BaseReviewer {

    protected buildTask(
        request: ReviewRequest
    ): PromptTask {

        return {

            goal:
                "Review the supplied implementation.",

            output:
                "Implementation Review Report",

            constraints: [

                "Follow Platform Architecture.",

                "Follow Domain Model.",

                "Follow Coding Standards.",

                "Follow Constitution.",

                "Use authoritative terminology only."

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
                "Implementation Reviewer",

            summary:
                result.inference.response,

            findings

        };

    }

}