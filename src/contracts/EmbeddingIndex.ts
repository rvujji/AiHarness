import type { DocumentChunk } from "./DocumentChunk.js";
import type { Embedding } from "./Embedding.js";

export interface EmbeddingIndex {

    version: number;

    generatedAt: string;

    model: string;

    dimension: number;

    stats: {

        documents: number;

        chunks: number;

    };

    documents: Record<string, IndexedDocument>;

    chunks: IndexedChunk[];

}

export interface IndexedDocument {

    title: string;

    path: string;

}

export interface IndexedChunk
    extends DocumentChunk,
        Embedding {

}