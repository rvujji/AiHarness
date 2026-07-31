import type { KnowledgeBundle }
    from "../contracts/KnowledgeBundle.js";

import type { OptimizedKnowledgeBundle }
    from "../contracts/OptimizedKnowledgeBundle.js";

import type { GenerationResult }
    from "../contracts/GenerationResult.js";

import type { EmbeddingIndex }
    from "../contracts/EmbeddingIndex.js";

export class ConsolePrinter {

    static printKnowledgeBundle(

        bundle: KnowledgeBundle

    ): void {

        console.log();

        console.log("Knowledge Bundle");
        console.log("================");

        console.log(
            `Documents : ${bundle.documents.length}`
        );

        console.log();

        console.log("Authority Order");
        console.log("---------------");

        for (const document of bundle.documents) {

            console.log(

                `${document.priority} - ${document.title}`

            );

        }

    }

    static printOptimizedKnowledge(

        bundle: OptimizedKnowledgeBundle

    ): void {

        console.log();

        console.log("Optimized Knowledge Bundle");
        console.log("==========================");

        console.log(
            `Query      : ${bundle.query}`
        );

        console.log(
            `Documents  : ${bundle.statistics.documents}`
        );

        console.log(
            `Contexts   : ${bundle.statistics.chunks}`
        );

        console.log(
            `Tokens     : ${bundle.statistics.tokenCount}`
        );

        console.log();

        for (const document of bundle.documents) {

            console.log(

                `[Priority ${document.priority}] ` +

                `[Relevance ${document.relevance.toFixed(4)}]`

            );

            console.log(
                document.title
            );

            console.log(

                `Matched Sections: ${document.matchedSections}`

            );

            console.log();

            for (const context of document.contexts) {

                console.log(

                    context.headings.join(" > ")

                );

                console.log();

                console.log(

                    context.content.substring(0, 300)

                );

                console.log();

            }

            console.log(

                "------------------------------------------------------------\n"

            );

        }

    }

    static printGenerationResult(

        result: GenerationResult

    ): void {

        console.log();

        console.log("LLM Response");
        console.log("============");

        console.log(

            result.inference.response

        );

        console.log();

        console.log("Verification");
        console.log("============");

        console.log(

            `Claims        : ${result.verification.totalClaims}`

        );

        console.log(

            `Supported     : ${result.verification.supportedClaims}`

        );

        console.log(

            `Partial       : ${result.verification.partialClaims}`

        );

        console.log(

            `Missing       : ${result.verification.missingClaims}`

        );

        console.log(

            `Contradicted  : ${result.verification.contradictedClaims}`

        );

        console.log();

        for (

            const verification of

            result.verification.results

        ) {

            const icon =

                verification.status === "supported"

                    ? "✓"

                : verification.status === "partial"

                    ? "⚠"

                : verification.status === "contradicted"

                    ? "✗"

                    : "?";

            console.log(

                `${icon} ${verification.claim.text}`

            );

            if (

                verification.evidence.length > 0

            ) {

                for (

                    const evidence of

                    verification.evidence

                ) {

                    console.log(

                        `    ${evidence.title}`

                    );

                    console.log(

                        `    ${evidence.headings.join(" > ")}`

                    );

                }

            }

            else {

                console.log(

                    "    No supporting evidence."

                );

            }

            console.log();

        }

    }

    static printEmbeddingIndex(
        index: EmbeddingIndex
    ): void {

        console.log();

        console.log("Embedding Index");
        console.log("===============");

        console.log(
            `Version      : ${index.version}`
        );

        console.log(
            `Generated At : ${index.generatedAt}`
        );

        console.log(
            `Model        : ${index.model}`
        );

        console.log(
            `Dimension    : ${index.dimension}`
        );

        console.log();

        console.log(
            `Documents    : ${index.stats.documents}`
        );

        console.log(
            `Chunks       : ${index.stats.chunks}`
        );

        console.log();

        console.log("Indexed Documents");
        console.log("-----------------");

        for (const [id, document] of Object.entries(index.documents)) {

            console.log(
                `${id} -> ${document.title}`
            );

        }

        console.log();

        console.log(
            `Embedding index written successfully.`
        );

    }

}