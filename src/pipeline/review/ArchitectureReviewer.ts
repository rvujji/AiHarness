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

            query:

                "architecture layering dependencies modules engines boundaries",
            objective:

                "Evaluate the supplied architecture for software architecture correctness.",

            checklist: [

                "Architectural layering",

                "Dependency direction",

                "Module ownership",

                "Component responsibilities",

                "Engine responsibilities",

                "Architectural boundaries",

                "Separation of concerns",

                "Composition",

                "Circular dependencies",

                "Scalability"

            ],

            outputSections:

                this.outputSections(),

            constraints: [

                ...this.commonConstraints(),

                "Do not invent architectural layers.",

                "Do not invent components.",

                "Do not invent dependencies.",

                "Do not infer deployment architecture."

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