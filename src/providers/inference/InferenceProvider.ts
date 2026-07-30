import type { InferenceRequest }
    from "../../contracts/InferenceRequest.js";

import type { InferenceResponse }
    from "../../contracts/InferenceResponse.js";

export interface InferenceProvider {

    generate(

        request: InferenceRequest

    ): Promise<InferenceResponse>;

}