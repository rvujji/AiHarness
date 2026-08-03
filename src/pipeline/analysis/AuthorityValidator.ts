import type {
    AuthorityFinding,
    AuthorityReport
} from "../../contracts/AuthorityReport.js";

import type { PromptVerificationReport }
    from "../../contracts/PromptVerificationReport.js";

export class AuthorityValidator {

    validate(
        report: PromptVerificationReport
    ): AuthorityReport {

        const findings: AuthorityFinding[] = [];

        let authoritative = 0;

        let weakAuthority = 0;

        for (const result of report.results) {

            if (

                result.evidence.length === 0

            ) {

                continue;

            }

            const highestPriority =

                Math.max(

                    ...result.evidence.map(

                        evidence =>

                            evidence.priority

                    )

                );

            const usedPriority =
                result.evidence[0].priority;

            if (

                usedPriority >= highestPriority

            ) {

                authoritative++;

                continue;

            }

            weakAuthority++;

            findings.push({

                claimId:
                    result.claim.id,

                claim:
                    result.claim.text,

                highestPriority,

                usedPriority,

                severity:

                    this.severity(

                        highestPriority,

                        usedPriority

                    ),

                reason:

                    `Best supporting evidence comes from priority ${usedPriority} although priority ${highestPriority} evidence exists.`

            });

        }

        return {

            total:

                authoritative +

                weakAuthority,

            authoritative,

            weakAuthority,

            findings

        };

    }

    //--------------------------------------------------

    private severity(

        highest: number,

        used: number

    ): "low" | "medium" | "high" {

        const delta =

            highest - used;

        if (delta >= 20) {

            return "high";

        }

        if (delta >= 10) {

            return "medium";

        }

        return "low";

    }

}