import type { Prompt }
    from "../contracts/Prompt.js";

import type { InferenceResponse }
    from "../contracts/InferenceResponse.js";

import { PromptSerializer }
    from "../pipeline/prompt/PromptSerializer.js";

import { OllamaInferenceProvider }
    from "../providers/inference/OllamaInferenceProvider.js";

export class InferenceService {

    private readonly serializer =
        new PromptSerializer();

    private readonly provider =
        new OllamaInferenceProvider();

    async infer(

        prompt: Prompt,

        model = "qwen3:8b"

    ): Promise<InferenceResponse> {

        const serializedPrompt =
            this.serializer.serialize(prompt);

        return this.provider.generate({

            model,

            prompt: serializedPrompt,

            temperature: 0

        });

    }

}