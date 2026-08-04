import { OllamaEmbeddingProvider } from "../providers/embeddings/OllamaEmbeddingProvider.js";

import { EmbeddingIndex } from "../pipeline/knowledge/EmbeddingIndex.js";
import { SearchEngine } from "../pipeline/knowledge/SearchEngine.js";
import { KnowledgeBundleBuilder } from "../pipeline/knowledge/KnowledgeBundleBuilder.js";
import { KnowledgeResolver } from "../pipeline/knowledge/KnowledgeResolver.js";
import { KnowledgeOptimizer } from "../pipeline/knowledge/KnowledgeOptimizer.js";
import { KnowledgeScope } from "../contracts/KnowledgeScope.js";

export class AskService {

    private readonly provider =
        new OllamaEmbeddingProvider();

    private readonly search =
        new SearchEngine(
            new EmbeddingIndex(
                "./artifacts/embeddings.json"
            )
        );

    async ask(question: string, scope?: KnowledgeScope) {

        console.log();
        console.log("Embedding Question...");

        const embedding =
            await this.provider.embed(question);

        console.log(
            `Vector Dimension: ${embedding.length}`
        );

        console.log();
        console.log("Searching...");

        const resolver =
            new KnowledgeResolver();

        const knowledge =
            resolver.resolve(
                "./feature-specs/example.yaml"
            );

        const matches =
            this.search.search(
                embedding,
                10
            );

        const builder =
            new KnowledgeBundleBuilder();

        const bundle =
            builder.build(
                question,
                knowledge.manifest,
                knowledge.terminology,
                knowledge.documents,
                matches
            );

        const optimizer =
            new KnowledgeOptimizer();

        return optimizer.optimize(bundle);

    }

}