export interface DocumentChunk {

    id: string;

    documentId: string;

    chunkIndex: number;

    headings: string[];

    content: string;

    tokenCount: number;

}