import type { OptimizedKnowledgeBundle }
    from "../../contracts/OptimizedKnowledgeBundle.js";

import type { PromptVerificationReport }
    from "../../contracts/PromptVerificationReport.js";

import { ClaimExtractor }
    from "./ClaimExtractor.js";

import { EvidenceExtractor }
    from "./EvidenceExtractor.js";

import { EvidenceVerifier }
    from "./EvidenceVerifier.js";

import { ConfidenceCalculator }
    from "./ConfidenceCalculator.js";

export class PromptVerificationService {

    private readonly claimExtractor =
        new ClaimExtractor();

    private readonly evidenceExtractor =
        new EvidenceExtractor();

    private readonly verifier =
        new EvidenceVerifier();

    private readonly confidenceCalculator =
        new ConfidenceCalculator();

    verify(

        response: string,

        bundle: OptimizedKnowledgeBundle

    ): PromptVerificationReport {

        //
        // Extract claims
        //

        const claims =
            this.claimExtractor.extract(
                response
            );

        //
        // Find supporting evidence
        //

        const claimEvidence =
            this.evidenceExtractor.extract(
                claims,
                bundle
            );

        //
        // Verify evidence
        //

        const results =
            this.verifier.verify(
                claimEvidence
            );

        const confidence =
            this.confidenceCalculator.calculate(
                results
            );

        return {

            totalClaims:
                results.length,

            supportedClaims:
                results.filter(
                    result =>
                        result.status === "supported"
                ).length,

            partialClaims:
                results.filter(
                    result =>
                        result.status === "partial"
                ).length,

            missingClaims:
                results.filter(
                    result =>
                        result.status === "missing"
                ).length,

            contradictedClaims:
                results.filter(
                    result =>
                        result.status === "contradicted"
                ).length,

            confidence: confidence,

            results

        };

    }

}