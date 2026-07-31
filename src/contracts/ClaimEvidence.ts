import type { Claim } from "./Claim.js";
import type { Evidence } from "./Evidence.js";

export interface ClaimEvidence {

    claim: Claim;

    evidence: Evidence[];

}