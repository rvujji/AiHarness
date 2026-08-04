import type { ReviewScore }
    from "../../../contracts/ReviewScore.js";

import type { ReviewType }
    from "../../../contracts/ReviewType.js";

interface KeywordRule {

    reviewer: ReviewType;

    keywords: string[];

    weight: number;

}

export class KeywordScorer {

    private static readonly RULES: KeywordRule[] = [

        {
            reviewer: "architecture",

            weight: 8,

            keywords: [

                "engine",

                "pipeline",

                "boundary",

                "architecture",

                "component",

                "service",

                "layer"

            ]

        },

        {
            reviewer: "ddd",

            weight: 10,

            keywords: [

                "aggregate",

                "aggregate root",

                "entity",

                "value object",

                "domain",

                "bounded context",

                "invariant"

            ]

        },

        {
            reviewer: "database",

            weight: 10,

            keywords: [

                "table",

                "column",

                "foreign key",

                "primary key",

                "index",

                "constraint",

                "postgres"

            ]

        },

        {
            reviewer: "api",

            weight: 10,

            keywords: [

                "openapi",

                "endpoint",

                "request",

                "response",

                "rest",

                "http",

                "json"

            ]

        },

        {
            reviewer: "implementation",

            weight: 8,

            keywords: [

                "class",

                "interface",

                "implements",

                "extends",

                "typescript",

                "function",

                "method"

            ]

        }

    ];

    score(
        content: string
    ): ReviewScore[] {

        const scores: ReviewScore[] = [];

        const text =
            content.toLowerCase();

        for (const rule of KeywordScorer.RULES) {

            let score = 0;

            const matched: string[] = [];

            for (const keyword of rule.keywords) {

                if (

                    text.includes(keyword)

                ) {

                    score += rule.weight;

                    matched.push(keyword);

                }

            }

            if (score === 0) {

                continue;

            }

            scores.push({

                reviewer:
                    rule.reviewer,

                score,

                reason:

                    `Matched keywords: ${matched.join(", ")}`

            });

        }

        return scores;

    }

}