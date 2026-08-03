import type { InferenceResponse }
    from "./InferenceResponse.js";

import type { PromptVerificationReport }
    from "./PromptVerificationReport.js";

import type { KnowledgeGapReport }
    from "./KnowledgeGapReport.js";

import type { TerminologyValidationReport }
    from "./Terminology.js";

import type { AuthorityReport }
    from "./AuthorityReport.js";

import type { ArchitectureReport }
    from "./ArchitectureReport.js";

export interface GenerationResult {

    inference: InferenceResponse;

    verification: PromptVerificationReport;

    knowledgeGaps: KnowledgeGapReport;

    terminology: TerminologyValidationReport;

    authority: AuthorityReport;

    architecture: ArchitectureReport;

}