import type { VerificationResult }
    from "./VerificationResult.js";

import type { VerificationConfidence }
    from "./VerificationConfidence.js";

export interface PromptVerificationReport {

    totalClaims: number;

    supportedClaims: number;

    partialClaims: number;

    missingClaims: number;

    contradictedClaims: number;

    results: VerificationResult[];

    confidence: VerificationConfidence;


}