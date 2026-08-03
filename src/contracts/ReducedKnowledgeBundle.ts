import type {
    OptimizedDocument
} from "./OptimizedKnowledgeBundle.js";

export interface ReducedKnowledgeBundle {

    documents: OptimizedDocument[];

    estimatedTokens: number;

}