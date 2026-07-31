import type { InferenceResponse }
    from "./InferenceResponse.js";

import type { PromptVerificationReport }
    from "./PromptVerificationReport.js";

export interface GenerationResult {

    inference: InferenceResponse;

    verification: PromptVerificationReport;

}