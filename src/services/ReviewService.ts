import type { ReviewRequest }
    from "../contracts/ReviewRequest.js";

import type { ReviewReport }
    from "../contracts/ReviewReport.js";

import type { ReviewType }
    from "../contracts/ReviewType.js";

import { ArchitectureReviewer }
    from "../pipeline/review/ArchitectureReviewer.js";

import { ApiReviewer }
    from "../pipeline/review/ApiReviewer.js";

import { DatabaseReviewer }
    from "../pipeline/review/DatabaseReviewer.js";

import { DddReviewer }
    from "../pipeline/review/DddReviewer.js";

import { ImplementationReviewer }
    from "../pipeline/review/ImplementationReviewer.js";

import { ReviewerResolver }
    from "../pipeline/review/ReviewerResolver.js";

import type { BaseReviewer }
    from "../pipeline/review/BaseReviewer.js";

export class ReviewService {

    private readonly resolver =
        new ReviewerResolver();

    private readonly reviewers:
        Record<ReviewType, BaseReviewer> = {

        architecture:
            new ArchitectureReviewer(),

        ddd:
            new DddReviewer(),

        database:
            new DatabaseReviewer(),

        api:
            new ApiReviewer(),

        implementation:
            new ImplementationReviewer()

    };

    async review(

        artifactPath: string,
        request: ReviewRequest,

        reviewer?: ReviewType

    ): Promise<ReviewReport> {

        //--------------------------------------------------
        // Resolve reviewer if not specified
        //--------------------------------------------------

        let selected =
            reviewer;

        if (!selected) {

            const selection =
                this.resolver.resolve(

                    artifactPath,

                    request.artifact

                );

            selected =
                selection.reviewer;

        }

        //--------------------------------------------------
        // Execute reviewer
        //--------------------------------------------------

        return this.reviewers[selected]

            .review(request);

    }

}