import type { InferenceResponse }
    from "../contracts/InferenceResponse.js";

import type { PromptTask }
    from "../contracts/PromptTask.js";

import { AskService }
    from "./AskService.js";

import { PromptBuilder }
    from "../pipeline/prompt/PromptBuilder.js";

import { InferenceService }
    from "./InferenceService.js";

export class GenerationService {

    private readonly askService =
        new AskService();

    private readonly promptBuilder =
        new PromptBuilder();

    private readonly inferenceService =
        new InferenceService();

    async generate(

        question: string,

        task: PromptTask,

        model = "qwen3:8b"

    ): Promise<InferenceResponse> {

        //
        // 1. Retrieve knowledge
        //

        const knowledge =
            await this.askService.ask(question);

        //
        // 2. Build prompt
        //

        const prompt =
            this.promptBuilder.build(

                knowledge,

                task

            );

        //
        // 3. Execute inference
        //

        return this.inferenceService.infer(

            prompt,

            model

        );

    }

}