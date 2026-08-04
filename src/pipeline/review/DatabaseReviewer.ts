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

export class DatabaseReviewer
    extends BaseReviewer {

    protected buildTask(
        request: ReviewRequest
    ): PromptTask {

        return {

            query:

                "database persistence aggregates tables foreign keys indexes",
            objective:

                "Evaluate the supplied design for relational database correctness.",

            checklist: [

                "Aggregate persistence",

                "Entity ownership",

                "Primary keys",

                "Foreign keys",

                "Referential integrity",

                "Cardinality",

                "Constraints",

                "Indexes",

                "Normalization",

                "Persistence boundaries"

            ],

            outputSections:

                this.outputSections(),

            constraints: [

                ...this.commonConstraints(),

                "Do not invent tables.",

                "Do not invent columns.",

                "Do not infer foreign keys.",

                "Do not infer indexes."

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
                "Database Reviewer",

            summary:
                result.inference.response,

            findings

        };

    }

}