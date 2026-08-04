import { GenerationResult } from "../../contracts/GenerationResult.js";
import { PromptTask } from "../../contracts/PromptTask.js";
import { ReviewFinding } from "../../contracts/ReviewFinding.js";
import { ReviewReport } from "../../contracts/ReviewReport.js";
import { ReviewRequest } from "../../contracts/ReviewRequest.js";
import { GenerationService } from "../../services/GenerationService.js";
import { ReviewFindingBuilder } from "./ReviewFindingBuilder.js";

export abstract class BaseReviewer {

    protected readonly generationService =
        new GenerationService();

    private readonly findingBuilder =
        new ReviewFindingBuilder();

    async review(
        request: ReviewRequest
    ): Promise<ReviewReport> {

        const task =
            this.buildTask(request);

        const result =

            await this.generationService.generate(

                task.query,   // or another short retrieval string

                task

            );

        const findings =

            this.findingBuilder.build(
                result
            );

        return this.buildReport(
            request,
            result,
            findings
        );

    }

    protected buildQuestion(
        request: ReviewRequest
    ): string {

        return this.buildTask(request).objective;

    }

    protected abstract buildTask(
        request: ReviewRequest
    ): PromptTask;

    protected abstract buildReport(

        request: ReviewRequest,

        result: GenerationResult,

        findings: ReviewFinding[]

    ): ReviewReport;

    protected outputSections(): string[] {

        return [

            "Summary",

            "Verified Facts",

            "Assumptions",

            "Missing Information",

            "Recommendations",

            "Not Specified in the Supplied Knowledge"

        ];

    }

    protected commonConstraints(): string[] {

        return [

            "Use only the supplied knowledge.",

            "Do not invent entities.",

            "Do not invent aggregates.",

            "Do not invent APIs.",

            "Do not invent implementation details.",

            "Recommendations must be derived from identified gaps."

        ];

    }

}