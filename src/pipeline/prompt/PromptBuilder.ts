import type { OptimizedKnowledgeBundle }
    from "../../contracts/OptimizedKnowledgeBundle.js";

import type { Prompt }
    from "../../contracts/Prompt.js";

import type { PromptTask }
    from "../../contracts/PromptTask.js";

import { PromptTemplate }
    from "./PromptTemplate.js";

export class PromptBuilder {

    private readonly template =
        new PromptTemplate();

    build(

        bundle: OptimizedKnowledgeBundle,

        task: PromptTask

    ): Prompt {

        return {

            system:
                this.template.system(),

            context:
                this.buildContext(bundle),

            task:
                this.buildTask(task)

        };

    }

    private buildContext(
        bundle: OptimizedKnowledgeBundle
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

        return `
Goal

${task.goal}

Expected Output

${task.output}

Constraints

${task.constraints
    .map(
        constraint => `- ${constraint}`
    )
    .join("\n")}
`.trim();

    }

}