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
import { TerminologyValidator } from "../pipeline/analysis/TerminologyValidator.js";
import { AuthorityValidator } from "../pipeline/analysis/AuthorityValidator.js";
import { ArchitectureValidator } from "../pipeline/analysis/ArchitectureValidator.js";

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

    private readonly terminologyValidator =
        new TerminologyValidator();

    private readonly authorityValidator =
        new AuthorityValidator();

    private readonly architectureValidator =
        new ArchitectureValidator();

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

        const terminology =
            this.terminologyValidator.validate(

                inference.response,

                knowledge.terminology

            );

        const authority =
            this.authorityValidator.validate(
                verification
            );

        const architecture =
            this.architectureValidator.validate(

                authority,

                terminology,

                knowledgeGaps

            );
        return {
            inference,
            verification,
            knowledgeGaps,
            terminology,
            authority,
            architecture
        };

    }

}