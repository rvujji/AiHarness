import type {
    InferenceProvider
} from "./InferenceProvider.js";

import type {
    InferenceRequest
} from "../../contracts/InferenceRequest.js";

import type {
    InferenceResponse
} from "../../contracts/InferenceResponse.js";

export class OllamaInferenceProvider
implements InferenceProvider {

    async generate(

        request: InferenceRequest

    ): Promise<InferenceResponse> {

        const started = Date.now();

        const response =
            await fetch(

                "http://localhost:11434/api/generate",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        model:
                            request.model,

                        prompt:
                            request.prompt,

                        stream:
                            false,

                        options: {

                            temperature:
                                request.temperature ?? 0

                        }

                    })

                }

            );

        if (!response.ok) {

            throw new Error(

                await response.text()

            );

        }

        const json =
            await response.json();

        return {

            model:
                json.model,

            response:
                json.response,

            promptTokens:
                json.prompt_eval_count,

            completionTokens:
                json.eval_count,

            durationMs:
                Date.now() - started

        };

    }

}