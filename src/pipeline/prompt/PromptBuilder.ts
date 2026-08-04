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

            task:
                this.buildReviewInstructions(task),

            context:
                this.buildContext(reduced),

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

    private buildReviewInstructions(
        task: PromptTask
    ): string {

        let text = "";

        //--------------------------------------------------
        // Objective
        //--------------------------------------------------

        text +=
    `OBJECTIVE
    =========

    ${task.objective}

    `;

        //--------------------------------------------------
        // Checklist
        //--------------------------------------------------

        text +=
    `CHECKLIST
    ==========

    `;

        for (

            const item of

            task.checklist

        ) {

            text +=
    `- ${item}
    `;

        }

        text += "\n";

        //--------------------------------------------------
        // Required Output
        //--------------------------------------------------

        text +=
    `REQUIRED OUTPUT
    ================

    `;

        for (

            const section of

            task.outputSections

        ) {

            text +=
    `- ${section}
    `;

        }

        return text.trim();

    }

    private buildConstraints(
        task: PromptTask
    ): string {

        if (

            task.constraints.length === 0

        ) {

            return "";

        }

        return [

            "ADDITIONAL CONSTRAINTS",

            "======================",

            "",

            ...task.constraints.map(

                constraint =>

                    `- ${constraint}`

            )

        ].join("\n");

    }

}