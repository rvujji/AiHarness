import type { Prompt }
    from "../../contracts/Prompt.js";

export class PromptSerializer {

    serialize(
        prompt: Prompt
    ): string {

        return [

            this.section(
                "SYSTEM",
                prompt.system
            ),

            this.section(
                "KNOWLEDGE",
                prompt.context
            ),

            this.section(
                "TASK",
                prompt.task
            ),

            this.section(
                "CONSTRAINTS",
                prompt.constraints
            ),

            this.section(
                "VERIFICATION",
                prompt.verification
            )

        ].join("\n\n");

    }

    private section(
        title: string,
        body: string
    ): string {

        return [

            "=".repeat(80),

            title,

            "=".repeat(80),

            "",

            body.trim()

        ].join("\n");

    }

}