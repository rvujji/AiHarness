import type { EmbeddingProvider } from "./EmbeddingProvider.js";

export class OllamaEmbeddingProvider
    implements EmbeddingProvider {

    async embed(text: string): Promise<number[]> {

        const response =
            await fetch(
                "http://localhost:11434/api/embeddings",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        model: "nomic-embed-text",

                        prompt: text

                    })

                }
            );

        if (!response.ok) {

            throw new Error(
                `Ollama Error ${response.status}`
            );

        }

        const json =
            await response.json();

        return json.embedding;

    }

}