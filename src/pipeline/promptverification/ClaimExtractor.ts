import type { Claim }
    from "../../contracts/Claim.js";

export class ClaimExtractor {

    extract(
        response: string
    ): Claim[] {

        const markdown =
            this.cleanMarkdown(response);

        const blocks =
            this.extractBlocks(markdown);

        const claims: Claim[] = [];

        let id = 1;

        for (const block of blocks) {

            const sentences =
                this.extractSentences(block);

            for (const sentence of sentences) {

                const claim =
                    this.normalize(sentence);

                if (!this.isClaim(claim)) {
                    continue;
                }

                claims.push({

                    id,

                    text: claim

                });

                id++;

            }

        }

        return claims;

    }

    //--------------------------------------------------
    // Remove markdown noise
    //--------------------------------------------------

    private cleanMarkdown(
        text: string
    ): string {

        return text

            .replace(/```[\s\S]*?```/g, "")

            .replace(/\r/g, "")

            .replace(/^>\s?/gm, "")

            .replace(/^\|.*$/gm, "")

            .replace(/^-{3,}$/gm, "")

            .trim();

    }

    //--------------------------------------------------
    // Split into logical blocks
    //--------------------------------------------------

    private extractBlocks(
        markdown: string
    ): string[] {

        return markdown

            .split(/\n\s*\n/)

            .map(

                block =>

                    block.trim()

            )

            .filter(Boolean);

    }

    //--------------------------------------------------
    // Extract atomic sentences
    //--------------------------------------------------

    private extractSentences(
        block: string
    ): string[] {

        const normalized =

            block

                // remove bullets

                .replace(/^\s*[-*+]\s+/gm, "")

                // remove numbered lists

                .replace(/^\s*\d+\.\s+/gm, "")

                // remove markdown headings

                .replace(/^#{1,6}\s+/gm, "")

                .trim();

        return normalized

            .split(

                /(?<=[.!?])\s+/

            )

            .map(

                sentence =>

                    sentence.trim()

            )

            .filter(Boolean);

    }

    //--------------------------------------------------
    // Remove markdown formatting
    //--------------------------------------------------

    private normalize(
        sentence: string
    ): string {

        return sentence

            .replace(/\*\*/g, "")

            .replace(/__/g, "")

            .replace(/`/g, "")

            .replace(/\s+/g, " ")

            .trim();

    }

    //--------------------------------------------------
    // Determine whether this is a factual claim
    //--------------------------------------------------

    private isClaim(
        sentence: string
    ): boolean {

        if (

            sentence.length < 25

        ) {

            return false;

        }

        const lower =
            sentence.toLowerCase();

        //
        // Ignore titles
        //

        if (

            !sentence.includes(" ")

        ) {

            return false;

        }

        //
        // Ignore common section headings
        //

        const headings = [

            "summary",

            "overview",

            "goal",

            "goals",

            "dependencies",

            "events",

            "apis",

            "constraints",

            "ownership",

            "output",

            "expected output",

            "inputs",

            "outputs"

        ];

        if (

            headings.includes(lower)

        ) {

            return false;

        }

        //
        // Must contain a verb
        //

        const verbs = [

            "is",

            "are",

            "has",

            "have",

            "creates",

            "owns",

            "belongs",

            "contains",

            "stores",

            "uses",

            "requires",

            "produces",

            "emits",

            "returns",

            "must",

            "should",

            "cannot",

            "may",

            "will"

        ];

        return verbs.some(

            verb =>

                lower.includes(` ${verb} `)

        );

    }

}