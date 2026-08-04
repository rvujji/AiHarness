import type {
    AuthorityFinding,
    AuthorityReport
} from "../../contracts/AuthorityReport.js";

import type {
    PromptVerificationReport
} from "../../contracts/PromptVerificationReport.js";

export class AuthorityValidator {

    //--------------------------------------------------
    // Only report if higher-authority evidence provides
    // comparable support.
    //--------------------------------------------------

    private static readonly COMPARABLE_SCORE = 0.90;

    validate(
        report: PromptVerificationReport
    ): AuthorityReport {

        const findings: AuthorityFinding[] = [];

        let authoritative = 0;

        let weakAuthority = 0;

        for (const result of report.results) {

            //--------------------------------------------------
            // No evidence
            //--------------------------------------------------

            if (

                result.evidence.length === 0

            ) {

                continue;

            }

            //--------------------------------------------------
            // Only one supporting document
            //--------------------------------------------------

            if (

                result.evidence.length === 1

            ) {

                authoritative++;

                continue;

            }

            //--------------------------------------------------
            // Evidence is already sorted by score.
            //--------------------------------------------------

            const selected =
                result.evidence[0];

            //--------------------------------------------------
            // Look for higher-authority evidence that is
            // almost as relevant.
            //--------------------------------------------------

            const betterAuthority =

                result.evidence.find(

                    evidence =>

                        evidence.priority >

                        selected.priority &&

                        evidence.score >=

                        selected.score *

                        AuthorityValidator.COMPARABLE_SCORE

                );

            //--------------------------------------------------
            // Selected evidence is acceptable.
            //--------------------------------------------------

            if (

                !betterAuthority

            ) {

                authoritative++;

                continue;

            }

            //--------------------------------------------------
            // Higher-authority evidence should probably
            // have been preferred.
            //--------------------------------------------------

            weakAuthority++;

            findings.push({

                claimId:
                    result.claim.id,

                claim:
                    result.claim.text,

                highestPriority:
                    betterAuthority.priority,

                usedPriority:
                    selected.priority,

                severity:

                    this.severity(

                        betterAuthority.priority,

                        selected.priority

                    ),

                reason:

                    `Higher-authority evidence (priority ${betterAuthority.priority}) provides comparable support but was not selected.`

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

        if (

            delta >= 20

        ) {

            return "high";

        }

        if (

            delta >= 10

        ) {

            return "medium";

        }

        return "low";

    }

}