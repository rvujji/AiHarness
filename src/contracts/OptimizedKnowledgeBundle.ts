import type { Manifest } from "./Manifest.js";
import type { Terminology } from "./Terminology.js";
import type { KnowledgeDocument } from "./KnowledgeDocument.js";

export interface OptimizedKnowledgeBundle {

    query: string;

    manifest: Manifest;

    terminology: Terminology;

    statistics: {

        documents: number;

        chunks: number;

        optimizedDocuments: number;

        tokenCount: number;

    };

    documents: OptimizedDocument[];

}

export interface OptimizedDocument {

    documentId: string;

    title: string;

    priority: number;

    relevance: number;

    matchedSections: number;

    contexts: OptimizedContext[];

}

export interface OptimizedContext {

    chunkIndex: number;

    headings: string[];

    content: string;

    score: number;

    tokenCount: number;

}