export interface InferenceResponse {

    model: string;

    response: string;

    promptTokens?: number;

    completionTokens?: number;

    durationMs?: number;

}