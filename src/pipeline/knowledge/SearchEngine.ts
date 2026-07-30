import { CosineSimilarity } from "./CosineSimilarity.js";
import { EmbeddingIndex } from "./EmbeddingIndex.js";
import type { SearchResult } from "./SearchResult.js";

export class SearchEngine {

    constructor(

        private readonly index: EmbeddingIndex

    ) {}

    search(

        queryEmbedding: number[],

        limit = 10

    ): SearchResult[] {

        const results: SearchResult[] = [];

        for (const chunk of this.index.getChunks()) {

            results.push({

                score:

                    CosineSimilarity.calculate(

                        queryEmbedding,

                        chunk.vector

                    ),

                chunk

            });

        }

        return results

            .sort(

                (a, b) =>

                    b.score - a.score

            )

            .slice(0, limit);

    }

}