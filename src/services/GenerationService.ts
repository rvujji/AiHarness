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

import { PromptVerificationService} from "../pipeline/promptverification/PromptVerificationService.js";
import { GenerationResult } from "../contracts/GenerationResult.js";

import { KnowledgeGapAnalyzer }
    from "../pipeline/analysis/KnowledgeGapAnalyzer.js";

export class GenerationService {
    
    private readonly askService =
        new AskService();

    private readonly promptBuilder =
        new PromptBuilder();

    private readonly inferenceService =
        new InferenceService();

    private readonly promptVerificationService =
        new PromptVerificationService();

    private readonly knowledgeGapAnalyzer =
        new KnowledgeGapAnalyzer();

    async generate(

        question: string,

        task: PromptTask,

        model = "qwen3:8b"

    ): Promise<GenerationResult> {

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
        const inference = await this.inferenceService.infer(

            prompt,

            model

        );

        const verification =
            this.promptVerificationService.verify(
                inference.response,
                knowledge
            );

        const knowledgeGaps =
            this.knowledgeGapAnalyzer.analyze(
                verification
            );
        return {
            inference,
            verification,
            knowledgeGaps
        };

    }

}