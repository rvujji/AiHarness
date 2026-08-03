import type { KnowledgeGap } from "./KnowledgeGap.js";

export interface KnowledgeGapReport {

    total: number;

    high: number;

    medium: number;

    low: number;

    gaps: KnowledgeGap[];

}