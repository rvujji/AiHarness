import type { PromptTask }
    from "../../contracts/PromptTask.js";

import type {
    OptimizedKnowledgeBundle,
    OptimizedDocument
} from "../../contracts/OptimizedKnowledgeBundle.js";

import type {
    ReducedKnowledgeBundle
} from "../../contracts/ReducedKnowledgeBundle.js";

export class PromptContextReducer {

    reduce(

        bundle: OptimizedKnowledgeBundle,

        task: PromptTask

    ): ReducedKnowledgeBundle {

        //
        // V1
        //
        // Keep documents already ordered by:
        //
        // Priority
        // Relevance
        //

        const documents: OptimizedDocument[] = [];

        let tokens = 0;

        for (const document of bundle.documents) {

            //
            // Ignore empty documents
            //

            if (

                document.contexts.length === 0

            ) {

                continue;

            }

            documents.push(document);

            tokens +=

                document.contexts.reduce(

                    (sum, context) =>

                        sum +

                        context.tokenCount,

                    0

                );

        }

        return {

            documents,

            estimatedTokens: tokens

        };

    }

}