import type { VerificationResult }
    from "./VerificationResult.js";

export interface PromptVerificationReport {

    totalClaims: number;

    supportedClaims: number;

    partialClaims: number;

    missingClaims: number;

    contradictedClaims: number;

    results: VerificationResult[];

}