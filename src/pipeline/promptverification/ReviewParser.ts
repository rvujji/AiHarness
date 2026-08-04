import type { ReviewDocument }
    from "../../contracts/ReviewDocument.js";

import type { ReviewSection }
    from "../../contracts/ReviewSection.js";

export class ReviewParser {

    parse(
        markdown: string
    ): ReviewDocument {

        let title = "";

        const sections: ReviewSection[] = [];

        let current: ReviewSection | undefined;

        const lines =

            markdown

                .replace(/\r/g, "")

                .split("\n");

        for (const raw of lines) {

            const line = raw.trim();

            if (line.length === 0) {

                continue;

            }

            //--------------------------------------------------
            // Ignore separators
            //--------------------------------------------------

            if (

                /^-{3,}$/.test(line)

            ) {

                continue;

            }

            //--------------------------------------------------
            // Document title (# ...)
            //--------------------------------------------------

            const titleMatch =

                line.match(/^#\s+(.*)$/);

            if (

                titleMatch

            ) {

                title =

                    this.normalize(

                        titleMatch[1]

                    );

                continue;

            }

            //--------------------------------------------------
            // Section heading (## ...)
            //--------------------------------------------------

            const heading =

                line.match(/^##\s+(.*)$/);

            if (

                heading

            ) {

                current = {

                    title:

                        this.normalize(

                            heading[1]

                        ),

                    items: []

                };

                sections.push(current);

                continue;

            }

            //--------------------------------------------------
            // Ignore everything until first section
            //--------------------------------------------------

            if (

                !current

            ) {

                continue;

            }

            //--------------------------------------------------
            // Bullet item
            //--------------------------------------------------

            if (

                line.startsWith("-")

            ) {

                current.items.push({

                    text:

                        this.normalize(

                            line.substring(1)

                        )

                });

                continue;

            }

            //--------------------------------------------------
            // Paragraph item (Summary, etc.)
            //--------------------------------------------------

            current.items.push({

                text:

                    this.normalize(

                        line

                    )

            });

        }

        return {

            title,

            sections

        };

    }

    //--------------------------------------------------
    // Remove markdown formatting
    //--------------------------------------------------

    private normalize(
        text: string
    ): string {

        return text

            .replace(/\*\*/g, "")

            .replace(/__/g, "")

            .replace(/`/g, "")

            .replace(/\s+/g, " ")

            .trim();

    }

}