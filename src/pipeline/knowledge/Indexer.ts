import fs from "node:fs";

import { MarkdownChunker } from "./MarkdownChunker.js";

import { OllamaEmbeddingProvider }
    from "../../providers/embeddings/OllamaEmbeddingProvider.js";

import type { KnowledgeDocument }
    from "../../contracts/KnowledgeDocument.js";

import type {
    EmbeddingIndex,
    IndexedChunk,
    IndexedDocument
} from "../../contracts/EmbeddingIndex.js";

export class Indexer {

    private readonly chunker =
        new MarkdownChunker();

    private readonly embeddingProvider =
        new OllamaEmbeddingProvider();

    async index(
        documents: KnowledgeDocument[]
    ): Promise<EmbeddingIndex> {

        const indexedDocuments:
            Record<string, IndexedDocument> = {};

        const indexedChunks:
            IndexedChunk[] = [];

        let dimension = 0;

        for (const document of documents) {

            console.log(`\n${document.title}`);

            indexedDocuments[document.id] = {

                title: document.title,

                path: document.path

            };

            const chunks =
                this.chunker.chunk(

                    document.id,

                    document.content

                );

            console.log(`${chunks.length} chunks`);

            for (const chunk of chunks) {

                process.stdout.write(`\r${document.title}: ${chunk.chunkIndex + 1}/${chunks.length}`);

                const vector =
                    await this.embeddingProvider.embed(
                        chunk.content
                    );

                dimension = vector.length;

                indexedChunks.push({

                    ...chunk,

                    vector

                });

            }

            console.log(" done");

        }

        const index: EmbeddingIndex = {

            version: 2,

            generatedAt:
                new Date().toISOString(),

            model:
                "nomic-embed-text",

            dimension,

            stats: {

                documents:
                    documents.length,

                chunks:
                    indexedChunks.length

            },

            documents:
                indexedDocuments,

            chunks:
                indexedChunks

        };

        fs.mkdirSync(
            "./artifacts",
            { recursive: true }
        );

        fs.writeFileSync(

            "./artifacts/embeddings.json",

            JSON.stringify(index, null, 2)

        );

        console.log();

        console.log("Index Complete");

        console.log(
            `${documents.length} documents`
        );

        console.log(
            `${indexedChunks.length} chunks`
        );

        console.log(
            `${dimension} dimensions`
        );

        return index;

    }

}