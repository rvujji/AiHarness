export interface SearchResult {

    score: number;

    chunkId: string;

    documentId: string;

    title: string;

    headings: string[];

    content: string;

}