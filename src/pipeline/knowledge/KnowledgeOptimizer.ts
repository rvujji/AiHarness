import type { KnowledgeBundle } from "../../contracts/KnowledgeBundle.js";

import type {
    OptimizedContext,
    OptimizedDocument,
    OptimizedKnowledgeBundle
} from "../../contracts/OptimizedKnowledgeBundle.js";

export class KnowledgeOptimizer {

    optimize(
        bundle: KnowledgeBundle
    ): OptimizedKnowledgeBundle {

        let documents =
            this.groupByDocument(bundle);

        documents =
            this.mergeNeighbourChunks(documents);

        documents =
            this.removeDuplicates(documents);

        documents =
            this.applyContextBudget(
                documents,
                12000
            );

        return {

            query:
                bundle.query ?? "",

            manifest:
                bundle.manifest,

            terminology:
                bundle.terminology,

            documents,

            statistics: {

                documents:
                    bundle.documents.length,

                chunks:
                    bundle.matches?.length ?? 0,

                optimizedDocuments:
                    documents.length,

                tokenCount:
                    documents.reduce(

                        (sum, document) =>

                            sum +

                            document.contexts.reduce(

                                (s, context) =>

                                    s + context.tokenCount,

                                0

                            ),

                        0

                    )

            }

        };

    }

    private groupByDocument(
        bundle: KnowledgeBundle
    ): OptimizedDocument[] {

        const grouped =
            new Map<string, OptimizedDocument>();

        for (const match of bundle.matches ?? []) {

            const source =
                bundle.documents.find(
                    document =>
                        document.id === match.chunk.documentId
                );

            if (!source) {
                continue;
            }

            let document =
                grouped.get(source.id);

            if (!document) {

                document = {

                    documentId:
                        source.id,

                    title:
                        source.title,

                    priority:
                        source.priority,

                    relevance:
                        0,

                    matchedSections:
                        0,

                    contexts: []

                };

                grouped.set(
                    source.id,
                    document
                );

            }

            const context: OptimizedContext = {

                chunkIndex:
                    match.chunk.chunkIndex,

                headings:
                    match.chunk.headings,

                content:
                    match.chunk.content,

                score:
                    match.score,

                tokenCount:
                    match.chunk.tokenCount

            };

            document.contexts.push(
                context
            );

        }

        for (const document of grouped.values()) {

            document.contexts.sort(

                (left, right) =>

                    left.chunkIndex -
                    right.chunkIndex

            );

            document.matchedSections =
                document.contexts.length;

            document.relevance =

                document.contexts.reduce(

                    (sum, context) =>

                        sum + context.score,

                    0

                ) /

                document.contexts.length;

        }

        return [...grouped.values()]

            .sort(

                (left, right) => {

                    if (

                        left.priority !==
                        right.priority

                    ) {

                        return (
                            right.priority -
                            left.priority
                        );

                    }

                    return (
                        right.relevance -
                        left.relevance
                    );

                }

            );

    }

    private mergeNeighbourChunks(
        documents: OptimizedDocument[]
    ): OptimizedDocument[] {

        // Commit 9
        return documents;

    }

    private removeDuplicates(
        documents: OptimizedDocument[]
    ): OptimizedDocument[] {

        // Commit 10
        return documents;

    }

    private applyContextBudget(

        documents: OptimizedDocument[],

        maxTokens: number

    ): OptimizedDocument[] {

        let usedTokens = 0;

        const selected:
            OptimizedDocument[] = [];

        for (const document of documents) {

            const documentTokens =

                document.contexts.reduce(

                    (sum, context) =>

                        sum +
                        context.tokenCount,

                    0

                );

            if (

                usedTokens +
                documentTokens >

                maxTokens

            ) {

                continue;

            }

            usedTokens +=
                documentTokens;

            selected.push(
                document
            );

        }

        return selected;

    }

}