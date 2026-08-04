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
import { Stopwatch } from "../shared/Stopwatch.js";

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

        const timer = new Stopwatch();
        //
        // 1. Retrieve knowledge
        //

        const knowledge =
            await this.askService.ask(question);
        console.log(`[${timer.elapsed()}] Knowledge retrieval complete`);
        //
        // 2. Build prompt
        //

        const prompt =
            this.promptBuilder.build(

                knowledge,

                task

            );
        console.log(`[${timer.elapsed()}] Prompt built`);
        //
        // 3. Execute inference
        //
        const inference = await this.inferenceService.infer(

            prompt,

            model

        );
        console.log(`[${timer.elapsed()}] LLM inference complete`);
        const verification =
            this.promptVerificationService.verify(
                inference.response,
                knowledge
            );
        console.log(`[${timer.elapsed()}] Verification complete`);
        const knowledgeGaps =
            this.knowledgeGapAnalyzer.analyze(
                verification
            );
        console.log(`[${timer.elapsed()}] Knowledge gaps analysis complete`);
        const terminology =
            this.terminologyValidator.validate(

                inference.response,

                knowledge.terminology

            );
        console.log(`[${timer.elapsed()}] Terminology validation complete`);
        const authority =
            this.authorityValidator.validate(
                verification
            );
        console.log(`[${timer.elapsed()}] Authority validation complete`);
        const architecture =
            this.architectureValidator.validate(

                authority,

                terminology,

                knowledgeGaps

            );
        console.log(`[${timer.elapsed()}] Architecture validation complete`);
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