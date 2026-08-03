import type { ArchitectureReport } from "../../contracts/ArchitectureReport.js";
import type { ArchitectureViolation } from "../../contracts/ArchitectureReport.js";

import type { AuthorityReport }
    from "../../contracts/AuthorityReport.js";

import type { KnowledgeGapReport }
    from "../../contracts/KnowledgeGapReport.js";

import type { TerminologyValidationReport }
    from "../../contracts/Terminology.js";

export class ArchitectureValidator {

    validate(

        authority: AuthorityReport,

        terminology: TerminologyValidationReport,

        gaps: KnowledgeGapReport

    ): ArchitectureReport {

        const violations: ArchitectureViolation[] = [];

        //--------------------------------------------------
        // Authority
        //--------------------------------------------------

        for (const finding of authority.findings) {

            violations.push({

                category:
                    "authority",

                severity:
                    finding.severity,

                message:
                    finding.reason

            });

        }

        //--------------------------------------------------
        // Terminology
        //--------------------------------------------------

        for (const violation of terminology.violations) {

            violations.push({

                category:
                    "terminology",

                severity:

                    violation.severity === "error"

                        ? "high"

                        : "medium",

                message:
                    violation.reason

            });

        }

        //--------------------------------------------------
        // Knowledge gaps
        //--------------------------------------------------

        for (const gap of gaps.gaps) {

            violations.push({

                category:
                    "knowledge",

                severity:
                    gap.severity,

                message:
                    gap.reason

            });

        }

        //--------------------------------------------------
        // Overall result
        //--------------------------------------------------

        let overall: ArchitectureReport["overall"] = "pass";

        if (

            violations.some(

                violation =>

                    violation.severity === "high"

            )

        ) {

            overall = "fail";

        }

        else if (

            violations.length > 0

        ) {

            overall = "warning";

        }

        return {

            overall,

            violations

        };

    }

}