import type { Prompt } from "../../contracts/Prompt.js";

export class PromptSerializer {

    serialize(
        prompt: Prompt
    ): string {

        return [

            "# SYSTEM",

            prompt.system,

            "",

            "# CONTEXT",

            prompt.context,

            "",

            "# TASK",

            prompt.task

        ].join("\n");

    }

}