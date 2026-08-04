import type { ReviewScore }
    from "../../../contracts/ReviewScore.js";

import type { ReviewType }
    from "../../../contracts/ReviewType.js";

interface PatternRule {

    reviewer: ReviewType;

    pattern: RegExp;

    weight: number;

    description: string;

}

export class PatternScorer {

    private static readonly RULES: PatternRule[] = [

        //--------------------------------------------------
        // Architecture
        //--------------------------------------------------

        {
            reviewer: "architecture",

            pattern: /\b[A-Za-z]+Engine\b/g,

            weight: 20,

            description: "Engine definition"

        },

        {
            reviewer: "architecture",

            pattern: /\bPipeline\b/g,

            weight: 15,

            description: "Pipeline"

        },

        {
            reviewer: "architecture",

            pattern: /\bLayer\b/g,

            weight: 10,

            description: "Layer"

        },

        //--------------------------------------------------
        // DDD
        //--------------------------------------------------

        {
            reviewer: "ddd",

            pattern: /\bAggregate Root\b/g,

            weight: 25,

            description: "Aggregate Root"

        },

        {
            reviewer: "ddd",

            pattern: /\bValue Object\b/g,

            weight: 20,

            description: "Value Object"

        },

        {
            reviewer: "ddd",

            pattern: /\bEntity\b/g,

            weight: 15,

            description: "Entity"

        },

        //--------------------------------------------------
        // Database
        //--------------------------------------------------

        {
            reviewer: "database",

            pattern: /\bCREATE\s+TABLE\b/gi,

            weight: 30,

            description: "CREATE TABLE"

        },

        {
            reviewer: "database",

            pattern: /\bPRIMARY\s+KEY\b/gi,

            weight: 20,

            description: "PRIMARY KEY"

        },

        {
            reviewer: "database",

            pattern: /\bFOREIGN\s+KEY\b/gi,

            weight: 20,

            description: "FOREIGN KEY"

        },

        //--------------------------------------------------
        // API
        //--------------------------------------------------

        {
            reviewer: "api",

            pattern: /^openapi:/gmi,

            weight: 40,

            description: "OpenAPI"

        },

        {
            reviewer: "api",

            pattern: /^\s*paths:/gmi,

            weight: 20,

            description: "OpenAPI Paths"

        },

        {
            reviewer: "api",

            pattern: /^\s*components:/gmi,

            weight: 20,

            description: "OpenAPI Components"

        },

        //--------------------------------------------------
        // Implementation
        //--------------------------------------------------

        {
            reviewer: "implementation",

            pattern: /\bclass\s+\w+/g,

            weight: 15,

            description: "Class"

        },

        {
            reviewer: "implementation",

            pattern: /\binterface\s+\w+/g,

            weight: 15,

            description: "Interface"

        },

        {
            reviewer: "implementation",

            pattern: /\bextends\b/g,

            weight: 10,

            description: "Inheritance"

        }

    ];

    score(
        content: string
    ): ReviewScore[] {

        const scores: ReviewScore[] = [];

        for (const rule of PatternScorer.RULES) {

            const matches =
                content.match(rule.pattern);

            if (!matches) {

                continue;

            }

            scores.push({

                reviewer:
                    rule.reviewer,

                score:

                    matches.length *

                    rule.weight,

                reason:

                    `${rule.description} (${matches.length})`

            });

        }

        return scores;

    }

}