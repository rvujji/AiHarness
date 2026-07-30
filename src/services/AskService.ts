import { OllamaEmbeddingProvider }
    from "../providers/embeddings/OllamaEmbeddingProvider.js";

import { EmbeddingIndex }
    from "../pipeline/knowledge/EmbeddingIndex.js";

import { SearchEngine }
    from "../pipeline/knowledge/SearchEngine.js";

export class AskService {

    private readonly provider =
        new OllamaEmbeddingProvider();

    private readonly search =
        new SearchEngine(
            new EmbeddingIndex(
                "./artifacts/embeddings.json"
            )
        );

    async ask(
        question: string
    ) {

        console.log();

        console.log("Embedding Question...");

        const embedding =
            await this.provider.embed(question);

        console.log(
            `Vector Dimension: ${embedding.length}`
        );

        console.log();

        console.log("Searching...");

        const results =
            this.search.search(
                embedding,
                10
            );

        return results;

    }

}