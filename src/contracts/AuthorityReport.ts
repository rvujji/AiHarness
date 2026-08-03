export interface AuthorityReport {

    total: number;

    authoritative: number;

    weakAuthority: number;

    findings: AuthorityFinding[];

}

export interface AuthorityFinding {

    claimId: number;

    claim: string;

    highestPriority: number;

    usedPriority: number;

    severity:
        | "low"
        | "medium"
        | "high";

    reason: string;

}