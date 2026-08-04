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

export class ApiReviewer
    extends BaseReviewer {

    protected buildTask(
        request: ReviewRequest
    ): PromptTask {

        return {

            query:

                "REST API endpoints request response status codes validation",
            objective:

                "Evaluate the supplied API design for correctness and consistency.",

            checklist: [

                "REST semantics",

                "Request models",

                "Response models",

                "Validation",

                "HTTP status codes",

                "Versioning",

                "Pagination",

                "Filtering",

                "Idempotency",

                "Error handling"

            ],

            outputSections:

                this.outputSections(),

            constraints: [

                ...this.commonConstraints(),

                "Do not invent endpoints.",

                "Do not invent payloads.",

                "Do not invent response models.",

                "Do not infer API contracts."

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
                "API Reviewer",

            summary:
                result.inference.response,

            findings

        };

    }

}