import type {
    Terminology,
    TerminologyValidationReport,
    TerminologyViolation
} from "../../contracts/Terminology.js";

export class TerminologyValidator {

    private static readonly MINIMUM_SCORE = 7;

    //--------------------------------------------------
    // Ignore obvious English/report vocabulary
    //--------------------------------------------------

    private static readonly IGNORED = new Set([

        "the",
        "this",
        "that",
        "these",
        "those",

        "it",
        "its",
        "for",
        "from",
        "into",
        "with",
        "without",

        "and",
        "or",
        "but",
        "however",
        "therefore",

        "review",
        "analysis",
        "summary",
        "finding",
        "findings",
        "issue",
        "issues",
        "recommendation",
        "recommendations",
        "status",
        "note",
        "notes",
        "conclusion",

        "verified",
        "fact",
        "assumption",
        "missing",
        "information",
        "expected",
        "available",
        "technical",
        "correct",
        "partial",
        "final"

    ]);

    //--------------------------------------------------

    validate(

        response: string,

        terminology: Terminology

    ): TerminologyValidationReport {

        const canonical = new Set(

            terminology.terms.map(

                term =>

                    term.name.toLowerCase()

            )

        );

        const candidates =
            this.extractCandidates(
                response
            );

        const frequencies =
            this.countCandidates(
                candidates
            );

        const violations: TerminologyViolation[] = [];

        for (

            const candidate of

            [...new Set(candidates)]

        ) {

            const {

                score,

                reasons

            } =

                this.score(

                    candidate,

                    response,

                    frequencies

                );

            if (

                score <

                TerminologyValidator.MINIMUM_SCORE

            ) {

                continue;

            }

            if (

                canonical.has(

                    candidate.toLowerCase()

                )

            ) {

                continue;

            }

            violations.push({

                text:
                    candidate,

                severity:
                    "warning",

                reason:

                    `Unknown terminology (score ${score})\n` +

                    reasons.join("\n"),

                suggestion:
                    "Use a canonical platform term or update terminology.yaml."

            });

        }

        return {

            total:
                violations.length,

            violations

        };

    }

    //--------------------------------------------------

    private extractCandidates(
        text: string
    ): string[] {

        const matches =

            text.match(

                /\b([A-Z][A-Za-z0-9]*(?:\s+[A-Z][A-Za-z0-9]*)*)\b/g

            ) ?? [];

        return matches

            .map(

                candidate =>

                    candidate.trim()

            )

            //--------------------------------------------------
            // Ignore tiny phrases
            //--------------------------------------------------

            .filter(

                candidate =>

                    candidate.length >= 3

            )

            //--------------------------------------------------
            // Ignore D1, D7, etc.
            //--------------------------------------------------

            .filter(

                candidate =>

                    !/^[A-Z]?\d+$/.test(candidate)

            )

            //--------------------------------------------------
            // Ignore common English/report words
            //--------------------------------------------------

            .filter(

                candidate =>

                    !TerminologyValidator.IGNORED.has(

                        candidate.toLowerCase()

                    )

            );

    }

    //--------------------------------------------------

    private countCandidates(
        candidates: string[]
    ): Map<string, number> {

        const counts =
            new Map<string, number>();

        for (

            const candidate of

            candidates

        ) {

            const key =
                candidate.toLowerCase();

            counts.set(

                key,

                (counts.get(key) ?? 0)

                + 1

            );

        }

        return counts;

    }

    //--------------------------------------------------

    private score(

        candidate: string,

        response: string,

        frequencies: Map<string, number>

    ): {

        score: number;

        reasons: string[];

    } {

        let score = 0;

        const reasons: string[] = [];

        //--------------------------------------------------
        // Multi-word phrase
        //--------------------------------------------------

        if (

            candidate.includes(" ")

        ) {

            score += 2;

            reasons.push(
                "+2 Multi-word phrase"
            );

        }

        //--------------------------------------------------
        // Proper Title Case
        //--------------------------------------------------

        if (

            candidate

                .split(" ")

                .every(

                    word =>

                        /^[A-Z]/.test(word)

                )

        ) {

            score += 2;

            reasons.push(
                "+2 Title Case"
            );

        }

        //--------------------------------------------------
        // Markdown heading
        //--------------------------------------------------

        const heading =

            new RegExp(

                `^#{1,6}\\s+${this.escape(candidate)}$`,

                "mi"

            );

        if (

            heading.test(

                response

            )

        ) {

            score += 4;

            reasons.push(
                "+4 Markdown Heading"
            );

        }

        //--------------------------------------------------
        // Inline code
        //--------------------------------------------------

        const inlineCode =

            new RegExp(

                "`" +

                this.escape(candidate) +

                "`"

            );

        if (

            inlineCode.test(

                response

            )

        ) {

            score += 4;

            reasons.push(
                "+4 Inline Code"
            );

        }

        //--------------------------------------------------
        // Appears multiple times
        //--------------------------------------------------

        const frequency =

            frequencies.get(

                candidate.toLowerCase()

            ) ?? 0;

        if (

            frequency >= 2

        ) {

            score += 3;

            reasons.push(
                `+3 Appears ${frequency} times`
            );

        }

        return {

            score,

            reasons

        };

    }

    //--------------------------------------------------

    private escape(
        value: string
    ): string {

        return value.replace(

            /[.*+?^${}()|[\]\\]/g,

            "\\$&"

        );

    }

}