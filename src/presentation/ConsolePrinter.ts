import type { KnowledgeBundle }
    from "../contracts/KnowledgeBundle.js";

import type { OptimizedKnowledgeBundle }
    from "../contracts/OptimizedKnowledgeBundle.js";

import type { GenerationResult }
    from "../contracts/GenerationResult.js";

import type { EmbeddingIndex }
    from "../contracts/EmbeddingIndex.js";
import { ReviewReport } from "../contracts/ReviewReport.js";

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

        console.log("==========================================================");
        console.log("                 AIHARNESS QUALITY REPORT");
        console.log("==========================================================");
        console.log();

        console.log(
            `Overall Confidence : ${(result.verification.confidence.overall * 100).toFixed(1)}%`
        );

        console.log(
            `Evidence Quality   : ${(result.verification.confidence.evidence * 100).toFixed(1)}%`
        );

        console.log(
            `Knowledge Coverage : ${(result.verification.confidence.coverage * 100).toFixed(1)}%`
        );

        console.log(
            `Hallucination Risk : ${(result.verification.confidence.hallucinationRisk * 100).toFixed(1)}%`
        );

        console.log();

        console.log(
            `Architecture       : ${result.architecture.overall.toUpperCase()}`
        );

        console.log(
            `Knowledge Gaps     : ${result.knowledgeGaps.total}`
        );

        console.log(
            `Terminology Issues : ${result.terminology.total}`
        );

        console.log(
            `Authority Issues   : ${result.authority.weakAuthority}`
        );

        console.log();

        console.log(
            `Claims             : ${result.verification.totalClaims}`
        );

        console.log(
            `Supported          : ${result.verification.supportedClaims}`
        );

        console.log(
            `Partial            : ${result.verification.partialClaims}`
        );

        console.log(
            `Missing            : ${result.verification.missingClaims}`
        );

        console.log(
            `Contradicted       : ${result.verification.contradictedClaims}`
        );

        console.log();

        console.log("==========================================================");

        console.log();

        console.log();

        console.log("Verification");
        console.log("============");
        console.log(`Overall Confidence : ${(result.verification.confidence.overall * 100).toFixed(1)}%`);
        console.log(`Evidence Quality   : ${(result.verification.confidence.evidence * 100).toFixed(1)}%`);
        console.log(`Knowledge Coverage : ${(result.verification.confidence.coverage * 100).toFixed(1)}%`);
        console.log(`Hallucination Risk : ${(result.verification.confidence.hallucinationRisk * 100).toFixed(1)}%`);
        console.log(`Claims        : ${result.verification.totalClaims}`);
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

            console.log("Knowledge Gaps");
            console.log("==============");

            console.log(
                `Total   : ${result.knowledgeGaps.total}`
            );

            console.log(
                `High    : ${result.knowledgeGaps.high}`
            );

            console.log(
                `Medium  : ${result.knowledgeGaps.medium}`
            );

            console.log(
                `Low     : ${result.knowledgeGaps.low}`
            );

            console.log();

            for (const gap of result.knowledgeGaps.gaps) {

                console.log(
                    `[${gap.severity.toUpperCase()}] ${gap.claim}`
                );

                console.log(
                    `Reason         : ${gap.reason}`
                );

                console.log(
                    `Recommendation : ${gap.recommendation}`
                );

                console.log();

            }

            console.log();

            console.log("Terminology");
            console.log("===========");

            console.log(
                `Violations : ${result.terminology.total}`
            );

            console.log();

            for (

                const violation of

                result.terminology.violations

            ) {

                const icon =

                    violation.severity === "error"

                        ? "✗"

                        : "⚠";

                console.log(

                    `${icon} ${violation.text}`

                );

                console.log(

                    `    ${violation.reason}`

                );

                if (violation.suggestion) {

                    console.log(

                        `    Suggestion: ${violation.suggestion}`

                    );

                }

                console.log();

            }

            console.log();

            console.log("Authority");
            console.log("=========");

            console.log(
                `Authoritative : ${result.authority.authoritative}`
            );

            console.log(
                `Weak Authority: ${result.authority.weakAuthority}`
            );

            console.log();

            for (

                const finding of

                result.authority.findings

            ) {

                console.log(

                    `[${finding.severity.toUpperCase()}] ${finding.claim}`

                );

                console.log(

                    `Highest Priority : ${finding.highestPriority}`

                );

                console.log(

                    `Used Priority    : ${finding.usedPriority}`

                );

                console.log(

                    `Reason           : ${finding.reason}`

                );

                console.log();

            }

            console.log();

            console.log("Architecture");
            console.log("============");

            console.log(
                `Overall : ${result.architecture.overall.toUpperCase()}`
            );

            console.log();

            for (

                const violation of

                result.architecture.violations

            ) {

                console.log(

                    `[${violation.severity.toUpperCase()}] ${violation.category}`

                );

                console.log(

                    `    ${violation.message}`

                );

                console.log();

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

    static printReviewReport(

        report: ReviewReport

    ): void {

        console.log();

        console.log(report.reviewer);

        console.log(

            "=".repeat(

                report.reviewer.length

            )

        );

        console.log();

        console.log(report.summary);

        console.log();

        console.log("Findings");

        console.log("--------");

        console.log();

        if (

            report.findings.length === 0

        ) {

            console.log(

                "No findings."

            );

            return;

        }

        for (

            const finding of

            report.findings

        ) {

            const icon =

                finding.severity === "error"

                    ? "✗"

                : finding.severity === "warning"

                    ? "⚠"

                    : "ℹ";

            console.log(

                `${icon} ${finding.title}`

            );

            console.log(

                `    Category : ${finding.category}`

            );

            console.log(

                `    ${finding.description}`

            );

            console.log(

                `    Recommendation: ${finding.recommendation}`

            );

            console.log();

        }

    }

}