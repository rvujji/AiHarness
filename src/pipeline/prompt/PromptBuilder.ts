import type { OptimizedKnowledgeBundle }
    from "../../contracts/OptimizedKnowledgeBundle.js";

import type { Prompt }
    from "../../contracts/Prompt.js";

import type { PromptTask }
    from "../../contracts/PromptTask.js";
import { ReducedKnowledgeBundle } from "../../contracts/ReducedKnowledgeBundle.js";

import { PromptContextReducer }
    from "./PromptContextReducer.js";

import { PromptTemplate }
    from "./PromptTemplate.js";

export class PromptBuilder {

    private readonly template =
        new PromptTemplate();
    private readonly reducer =
        new PromptContextReducer();

    build(

        bundle: OptimizedKnowledgeBundle,

        task: PromptTask

    ): Prompt {

        const reduced =

            this.reducer.reduce(

                bundle,

                task

            );

        return {

            system:
                this.template.system(),

                context:
                this.buildContext(reduced),

            task:
                this.buildTask(task),

            constraints:
                this.buildConstraints(task),

            verification:
                this.template.verification()

        };

    }

    private buildContext(
        bundle: ReducedKnowledgeBundle
    ): string {

        let text = "";

        for (const document of bundle.documents) {

            text +=
`# ${document.title}
Priority: ${document.priority}
Relevance: ${document.relevance.toFixed(4)}

`;

            for (const context of document.contexts) {

                text +=
`${context.headings.join(" > ")}

${context.content}

`;

            }

            text += "\n";

        }

        return text;

    }

    private buildTask(
        task: PromptTask
    ): string {

        return task.goal.trim();

    }

    private buildConstraints(
        task: PromptTask
    ): string {

        return task.constraints

            .map(

                constraint =>

                    `- ${constraint}`

            )

            .join("\n");

    }

}