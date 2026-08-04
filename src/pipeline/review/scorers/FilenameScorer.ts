import path from "node:path";

import type { ReviewScore }
    from "../../../contracts/ReviewScore.js";

import type { ReviewType }
    from "../../../contracts/ReviewType.js";

export class FilenameScorer {

    score(
        filePath: string
    ): ReviewScore[] {

        const scores: ReviewScore[] = [];

        const fileName =

            path.basename(filePath)

                .toLowerCase();

        const extension =

            path.extname(fileName);

        //--------------------------------------------------
        // Extension Rules
        //--------------------------------------------------

        switch (extension) {

            case ".ts":

            case ".tsx":

            case ".js":

            case ".jsx":

                scores.push(

                    this.create(

                        "implementation",

                        60,

                        `Source file (${extension})`

                    )

                );

                break;

            case ".sql":

                scores.push(

                    this.create(

                        "database",

                        70,

                        "SQL file"

                    )

                );

                break;

            case ".yaml":

            case ".yml":

                scores.push(

                    this.create(

                        "api",

                        30,

                        "YAML document"

                    )

                );

                break;

        }

        //--------------------------------------------------
        // Exact filename rules
        //--------------------------------------------------

        const exactRules:

            Record<string, ReviewType> = {

            "platformarchitecture.md":
                "architecture",

            "engines.md":
                "architecture",

            "domainmodel.md":
                "ddd",

            "aggregates.md":
                "ddd",

            "databasemodel.md":
                "database",

            "apiguidelines.md":
                "api",

            "codingstandards.md":
                "implementation",

            "constitution.md":
                "implementation",

            "agents.md":
                "implementation"

        };

        const reviewer =
            exactRules[fileName];

        if (reviewer) {

            scores.push(

                this.create(

                    reviewer,

                    80,

                    `Filename matched ${fileName}`

                )

            );

        }

        //--------------------------------------------------
        // ADR
        //--------------------------------------------------

        if (

            fileName.startsWith("adr-")

        ) {

            scores.push(

                this.create(

                    "architecture",

                    80,

                    "ADR document"

                )

            );

        }

        return scores;

    }

    //--------------------------------------------------

    private create(

        reviewer: ReviewType,

        score: number,

        reason: string

    ): ReviewScore {

        return {

            reviewer,

            score,

            reason

        };

    }

}