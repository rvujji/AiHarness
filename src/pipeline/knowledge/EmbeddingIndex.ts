import { TextLoader } from "../../shared/TextLoader.js";

export interface IndexedChunk {

    id: string;

    documentId: string;

    chunkIndex: number;

    headings: string[];

    content: string;

    tokenCount: number;

    vector: number[];

}

interface EmbeddingFile {

    model: string;

    dimension: number;

    chunks: IndexedChunk[];

}

export class EmbeddingIndex {

    private readonly embeddingFile: EmbeddingFile;

    constructor(
        filePath = "./knowledge/embeddings.json"
    ) {

        this.embeddingFile =
            JSON.parse(
                TextLoader.load(filePath)
            );

    }

    getModel(): string {

        return this.embeddingFile.model;

    }

    getDimension(): number {

        return this.embeddingFile.dimension;

    }

    getChunks(): IndexedChunk[] {

        return this.embeddingFile.chunks;

    }

}