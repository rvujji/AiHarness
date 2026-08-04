import type { ReviewerSelection }
    from "../../contracts/ReviewerSelection.js";

import type { ReviewScore }
    from "../../contracts/ReviewScore.js";

import type { ReviewType }
    from "../../contracts/ReviewType.js";

import { FilenameScorer }
    from "./scorers/FilenameScorer.js";

import { KeywordScorer }
    from "./scorers/KeywordScorer.js";

import { PatternScorer }
    from "./scorers/PatternScorer.js";

export class ReviewerResolver {

    private readonly filenameScorer =
        new FilenameScorer();

    private readonly keywordScorer =
        new KeywordScorer();

    private readonly patternScorer =
        new PatternScorer();

    resolve(

        filePath: string,

        content: string

    ): ReviewerSelection {

        const scores: ReviewScore[] = [

            ...this.filenameScorer.score(

                filePath

            ),

            ...this.keywordScorer.score(

                content

            ),

            ...this.patternScorer.score(

                content

            )

        ];

        //
        // Aggregate reviewer scores
        //

        const totals =
            new Map<ReviewType, number>();

        const reasons =
            new Map<ReviewType, string[]>();

        for (const score of scores) {

            totals.set(

                score.reviewer,

                (totals.get(score.reviewer) ?? 0)

                + score.score

            );

            if (

                !reasons.has(

                    score.reviewer

                )

            ) {

                reasons.set(

                    score.reviewer,

                    []

                );

            }

            reasons.get(

                score.reviewer

            )!.push(

                score.reason

            );

        }

        const ranking =

            [...totals.entries()]

                .map(

                    ([reviewer, score]) => ({

                        reviewer,

                        score,

                        reason:

                            reasons.get(

                                reviewer

                            )?.join(", ")

                            ?? ""

                    })

                )

                .sort(

                    (a,b)=>

                        b.score-a.score

                );

        //
        // Default reviewer
        //

        if (

            ranking.length === 0

        ) {

            return {

                reviewer:

                    "implementation",

                confidence: 0,

                reasons: [

                    "No matching rules."

                ],

                ranking: []

            };

        }

        //
        // Confidence
        //

        const totalScore =

            ranking.reduce(

                (sum, score)=>

                    sum + score.score,

                0

            );

        const winner =
            ranking[0];

        return {

            reviewer:

                winner.reviewer,

            confidence:

                totalScore === 0

                    ? 0

                    : Number(

                        (

                            winner.score /

                            totalScore *

                            100

                        ).toFixed(1)

                    ),

            reasons:

                reasons.get(

                    winner.reviewer

                ) ?? [],

            ranking

        };

    }

}