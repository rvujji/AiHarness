export interface KnowledgeGap {

    claimId: number;

    claim: string;

    severity:
        | "low"
        | "medium"
        | "high";

    reason: string;

    recommendation: string;

}