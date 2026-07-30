import { TextUtils } from "../../shared/TextUtils.js";

import type { DocumentChunk } from "../../contracts/DocumentChunk.js";

export class MarkdownChunker {

    chunk(
        documentId: string,
        content: string
    ): DocumentChunk[] {

        const chunks: DocumentChunk[] = [];

        const lines = content.split("\n");

        const headingStack: string[] = [];

        let currentHeading = "";

        let currentContent: string[] = [];

        let chunkIndex = 0;

        const flush = () => {

            if (currentContent.length === 0) {
                return;
            }

            const body =
                currentContent
                    .join("\n")
                    .trim()
                    .replace(/\n{3,}/g, "\n\n");

            if (!body) {
                return;
            }

            chunks.push({

                id: `${documentId}-${chunkIndex + 1}`,

                documentId,

                chunkIndex,

                headings: [...headingStack],

                content: body,

                tokenCount:
                    TextUtils.tokenCount(body)

            });

            chunkIndex++;

            currentContent = [];

        };

        for (const line of lines) {

            const match =
                line.match(/^(#{1,6})\s+(.*)$/);

            if (match) {

                flush();

                const level =
                    match[1].length;

                const heading =
                    match[2].trim();

                headingStack.length = level - 1;

                headingStack.push(heading);

                currentHeading = heading;

                currentContent.push(currentHeading);

                continue;

            }

            currentContent.push(line);

        }

        flush();

        return chunks;

    }

}