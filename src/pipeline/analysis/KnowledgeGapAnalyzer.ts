import type { KnowledgeGap }
    from "../../contracts/KnowledgeGap.js";

import type { KnowledgeGapReport }
    from "../../contracts/KnowledgeGapReport.js";

import type { ReviewDocument }
    from "../../contracts/ReviewDocument.js";

export class KnowledgeGapAnalyzer {

    private static readonly SECTION =
        "missing information";

    analyze(
        review: ReviewDocument
    ): KnowledgeGapReport {

        const gaps: KnowledgeGap[] = [];

        const section =

            review.sections.find(

                section =>

                    section.title.toLowerCase() ===

                    KnowledgeGapAnalyzer.SECTION

            );

        if (!section) {

            return {

                total: 0,

                high: 0,

                medium: 0,

                low: 0,

                gaps: []

            };

        }

        let id = 1;

        for (

            const item of

            section.items

        ) {

            gaps.push({

                claimId:
                    id++,

                claim:
                    item.text,

                severity:
                    "medium",

                reason:
                    "The review identified this information as missing from the supplied knowledge.",

                recommendation:
                    "Add authoritative documentation covering this topic."

            });

        }

        return {

            total:
                gaps.length,

            high:
                gaps.filter(

                    gap =>

                        gap.severity === "high"

                ).length,

            medium:
                gaps.filter(

                    gap =>

                        gap.severity === "medium"

                ).length,

            low:
                gaps.filter(

                    gap =>

                        gap.severity === "low"

                ).length,

            gaps

        };

    }

}