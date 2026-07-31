import type { ClaimEvidence }
    from "../../contracts/ClaimEvidence.js";

import type { VerificationResult }
    from "../../contracts/VerificationResult.js";

export class EvidenceVerifier {

    verify(
        claims: ClaimEvidence[]
    ): VerificationResult[] {

        const results: VerificationResult[] = [];

        for (const claim of claims) {

            let status:
                VerificationResult["status"];

            if (claim.evidence.length === 0) {

                status = "missing";

            }

            else {

                const bestScore =
                    claim.evidence[0].score;

                if (bestScore >= 0.75) {

                    status = "supported";

                }

                else if (bestScore >= 0.40) {

                    status = "partial";

                }

                else {

                    status = "missing";

                }

            }

            results.push({

                claim: claim.claim,

                status,

                evidence: claim.evidence

            });

        }

        return results;

    }

}