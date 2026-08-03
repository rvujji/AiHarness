import type { KnowledgeGap } from "../../contracts/KnowledgeGap.js";
import type { KnowledgeGapReport } from "../../contracts/KnowledgeGapReport.js";
import type { PromptVerificationReport } from "../../contracts/PromptVerificationReport.js";

export class KnowledgeGapAnalyzer {

    analyze(
        verification: PromptVerificationReport
    ): KnowledgeGapReport {

        const gaps: KnowledgeGap[] = [];

        for (const result of verification.results) {

            if (result.status !== "missing") {
                continue;
            }

            gaps.push({

                claimId:
                    result.claim.id,

                claim:
                    result.claim.text,

                severity:
                    this.determineSeverity(result.confidence),

                reason:
                    this.determineReason(result),

                recommendation:
                    this.determineRecommendation(result)

            });

        }

        return {

            total:
                gaps.length,

            high:
                gaps.filter(
                    gap => gap.severity === "high"
                ).length,

            medium:
                gaps.filter(
                    gap => gap.severity === "medium"
                ).length,

            low:
                gaps.filter(
                    gap => gap.severity === "low"
                ).length,

            gaps

        };

    }

    //--------------------------------------------------

    private determineSeverity(
        confidence: number
    ): KnowledgeGap["severity"] {

        if (confidence < 0.20) {

            return "high";

        }

        if (confidence < 0.50) {

            return "medium";

        }

        return "low";

    }

    //--------------------------------------------------

    private determineReason(
        result: PromptVerificationReport["results"][number]
    ): string {

        if (result.evidence.length === 0) {

            return "No supporting evidence was retrieved.";

        }

        return "Available evidence is insufficient to support the claim.";

    }

    //--------------------------------------------------

    private determineRecommendation(
        result: PromptVerificationReport["results"][number]
    ): string {

        if (result.evidence.length === 0) {

            return "Add authoritative documentation describing this concept.";

        }

        return "Improve or clarify the existing documentation for this concept.";

    }

}