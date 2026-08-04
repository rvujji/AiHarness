import type { GenerationResult }
    from "../../contracts/GenerationResult.js";

import type { ReviewFinding }
    from "../../contracts/ReviewFinding.js";

export class ReviewFindingBuilder {

    build(
        result: GenerationResult
    ): ReviewFinding[] {

        const findings: ReviewFinding[] = [];

        //--------------------------------------------------
        // Architecture
        //--------------------------------------------------

        for (

            const violation of

            result.architecture.violations

        ) {

            findings.push({

                category:
                    "Architecture",

                severity:

                    this.mapSeverity(
                        violation.severity
                    ),

                title:
                    violation.category,

                description:
                    violation.message,

                recommendation:
                    "Resolve the architecture violation."

            });

        }

        //--------------------------------------------------
        // Knowledge gaps
        //--------------------------------------------------

        for (

            const gap of

            result.knowledgeGaps.gaps

        ) {

            findings.push({

                category:
                    "Knowledge",

                severity:

                    this.mapSeverity(
                        gap.severity
                    ),

                title:
                    "Knowledge Gap",

                description:
                    gap.reason,

                recommendation:
                    "Consult authoritative documentation."

            });

        }

        //--------------------------------------------------
        // Terminology
        //--------------------------------------------------

        for (

            const violation of

            result.terminology.violations

        ) {

            findings.push({

                category:
                    "Terminology",

                severity:

                    this.mapSeverity(
                        violation.severity
                    ),

                title:
                    violation.text,

                description:
                    violation.reason,

                recommendation:

                    violation.suggestion ??  "Use the canonical terminology."

            });

        }

        //--------------------------------------------------
        // Authority
        //--------------------------------------------------

        for (

            const finding of

            result.authority.findings

        ) {

            findings.push({

                category:
                    "Authority",

                severity:

                    this.mapSeverity(
                        finding.severity
                    ),

                title:
                    finding.claim,

                description:
                    finding.reason,

                recommendation:
                    "Prefer higher-authority sources."

            });

        }

        //--------------------------------------------------
        // Verification
        //--------------------------------------------------

        for (

            const verification of

            result.verification.results

        ) {

            if (

                verification.status ===

                "supported"

            ) {

                continue;

            }

            findings.push({

                category:
                    "Verification",

                severity:

                    verification.status ===

                    "partial"

                        ? "warning"

                        : "error",

                title:
                    verification.claim.text,

                description:

                    `Claim is ${verification.status}.`,

                recommendation:

                    "Provide stronger supporting evidence."

            });

        }

        return findings;

    }

    //--------------------------------------------------

    private mapSeverity(

        severity: string

    ): "info" | "warning" | "error" {

        switch (severity) {

            case "high":

            case "error":

                return "error";

            case "medium":

            case "warning":

                return "warning";

            default:

                return "info";

        }

    }

}