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

            query:

                "SOLID maintainability coupling cohesion implementation",
            objective:

                "Evaluate the supplied implementation for maintainability and correctness.",

            checklist: [

                "SOLID principles",

                "Coupling",

                "Cohesion",

                "Readability",

                "Maintainability",

                "Error handling",

                "Performance",

                "Consistency",

                "Naming",

                "Testability"

            ],

            outputSections:

                this.outputSections(),

            constraints: [

                ...this.commonConstraints(),

                "Do not infer implementation details.",

                "Do not invent algorithms.",

                "Do not invent classes.",

                "Do not speculate about performance."

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