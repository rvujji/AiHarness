import type { Claim }
    from "../../contracts/Claim.js";

import type { ReviewDocument }
    from "../../contracts/ReviewDocument.js";

export class ClaimExtractor {

    private static readonly VERIFIED_FACTS =
        "verified facts";

    extract(
        review: ReviewDocument
    ): Claim[] {

        const claims: Claim[] = [];

        let id = 1;

        const section =

            review.sections.find(

                section =>

                    section.title.toLowerCase() ===

                    ClaimExtractor.VERIFIED_FACTS

            );

        if (

            !section

        ) {

            return claims;

        }

        for (

            const item of

            section.items

        ) {

            claims.push({

                id,

                text: item.text

            });

            id++;

        }

        return claims;

    }

}