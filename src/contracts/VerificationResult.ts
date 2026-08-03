import type { Claim } from "./Claim.js";
import type { Evidence } from "./Evidence.js";

export type VerificationStatus =
    | "supported"
    | "contradicted"
    | "missing"
    | "partial";

export interface VerificationResult {

    claim: Claim;

    status: VerificationStatus;

    confidence: number;

    evidence: Evidence[];

}