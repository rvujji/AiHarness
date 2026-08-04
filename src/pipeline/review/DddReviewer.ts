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

            query:
                "DDD aggregates bounded contexts domain events repositories invariants",
            objective:

                "Evaluate the supplied architecture for Domain-Driven Design correctness.",
            checklist: [

                "Aggregate boundaries",

                "Aggregate ownership",

                "Aggregate lifecycle",

                "Aggregate invariants",

                "Aggregate consistency",

                "Bounded contexts",

                "Domain services",

                "Domain events",

                "Repositories",

                "Transaction boundaries",

                "Ubiquitous language"

            ],

            outputSections:

                this.outputSections(),

            constraints: [

                ...this.commonConstraints(),

                "Do not invent aggregates.",

                "Do not invent bounded contexts.",

                "Do not invent domain events.",

                "Do not infer repositories.",

                "Do not infer transaction boundaries."

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