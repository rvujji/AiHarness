import type { Claim } from "../../contracts/Claim.js";
import type { ClaimEvidence } from "../../contracts/ClaimEvidence.js";
import type { Evidence } from "../../contracts/Evidence.js";
import type { OptimizedKnowledgeBundle } from "../../contracts/OptimizedKnowledgeBundle.js";

export class EvidenceExtractor {

    private static readonly STOP_WORDS = new Set([

        "the","a","an","and","or","for","with","from","into",
        "that","this","these","those","their","there","which",
        "will","would","should","could","must","have","has",
        "had","been","being","were","was","are","is","of","to",
        "on","in","by","at","as","it","its","than"

    ]);

    extract(

        claims: Claim[],

        bundle: OptimizedKnowledgeBundle

    ): ClaimEvidence[] {

        return claims.map(

            claim => ({

                claim,

                evidence:

                    this.findEvidence(

                        claim,

                        bundle

                    )

            })

        );

    }

    //--------------------------------------------------

    private findEvidence(

        claim: Claim,

        bundle: OptimizedKnowledgeBundle

    ): Evidence[] {

        const keywords =
            this.extractKeywords(
                claim.text
            );

        const evidence: Evidence[] = [];

        const seen = new Set<string>();

        for (const document of bundle.documents) {

            for (const context of document.contexts) {

                const key =
                    document.documentId +
                    ":" +
                    context.chunkIndex;

                if (seen.has(key)) {
                    continue;
                }

                const score =
                    this.scoreContext(

                        keywords,

                        context.headings,

                        context.content,

                        document.priority

                    );

                if (score <= 0) {
                    continue;
                }

                seen.add(key);

                evidence.push({

                    documentId:
                        document.documentId,

                    title:
                        document.title,

                    headings:
                        context.headings,

                    content:
                        context.content,

                    score

                });

            }

        }

        return evidence

            .sort(

                (a,b)=>

                    b.score-a.score

            )

            .slice(0,3);

    }

    private scoreContext(

        keywords: string[],

        headings: string[],

        content: string,

        priority: number

    ): number {

        const headingText =

            headings
                .join(" ")
                .toLowerCase();

        const body =
            content.toLowerCase();

        let matched = 0;

        let headingMatches = 0;

        for (const keyword of keywords) {

            if (

                headingText.includes(keyword)

            ) {

                matched++;

                headingMatches++;

            }

            else if (

                body.includes(keyword)

            ) {

                matched++;

            }

        }

        if (matched === 0) {

            return 0;

        }

        const coverage =

            matched /

            keywords.length;

        const headingBonus =

            headingMatches * 0.05;

        const authorityBonus =

            (priority - 80) / 100;

        return Math.min(

            1,

            coverage +

            headingBonus +

            authorityBonus

        );

    }

    //--------------------------------------------------

    private extractKeywords(
        text: string
    ): string[] {

        return [

            ...new Set(

                text

                    .toLowerCase()

                    .replace(

                        /[^a-z0-9 ]/g,

                        " "

                    )

                    .split(/\s+/)

                    .filter(

                        word =>

                            word.length > 2 &&

                            !EvidenceExtractor.STOP_WORDS.has(word)

                    )

            )

        ];

    }

}