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

            //
            // Consider only the strongest evidence.
            //

            const evidence =
                claim.evidence
                    .slice(0, 3);

            const confidence =
                this.calculateConfidence(
                    evidence
                );

            const status =
                this.determineStatus(
                    evidence,
                    confidence
                );
//--------------------------------------------------
// Debug
//--------------------------------------------------

console.log("\n====================================");
console.log("Claim:");
console.log(claim.claim.text);
console.log("Status:", status);
console.log("Confidence:", confidence.toFixed(3));

for (const item of evidence) {

    console.log(
        `  P${item.priority} | Score=${item.score.toFixed(3)} | ${item.title}`
    );

}
            results.push({

                claim: claim.claim,

                status,

                confidence,

                evidence

            });

        }

        return results;

    }

    //--------------------------------------------------
    // Confidence
    //--------------------------------------------------

    private calculateConfidence(
        evidence: ClaimEvidence["evidence"]
    ): number {

        if (evidence.length === 0) {

            return 0;

        }

        const best =
            evidence[0].score;

        const average =

            evidence.reduce(

                (sum, item) =>

                    sum + item.score,

                0

            ) / evidence.length;

        //
        // Bias slightly toward the strongest match.
        //

        return (

            best * 0.70 +

            average * 0.30

        );

    }

    //--------------------------------------------------
    // Classification
    //--------------------------------------------------

    private determineStatus(

        evidence: ClaimEvidence["evidence"],

        confidence: number

    ): VerificationResult["status"] {

        if (

            evidence.length === 0

        ) {

            return "missing";

        }

        const best =
            evidence[0].score;

        const average =

            evidence.reduce(

                (sum, item) =>

                    sum + item.score,

                0

            ) / evidence.length;

        if (

            confidence >= 0.80

        ) {

            return "supported";

        }

        if (

            confidence >= 0.60

        ) {

            return "partial";

        }

        return "missing";

    }

}