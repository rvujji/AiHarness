import type { IndexedChunk } from "./EmbeddingIndex.js";

export interface SearchResult {

    score: number;

    chunk: IndexedChunk;

}