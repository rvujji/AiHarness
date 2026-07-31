import type { Claim } from "../../contracts/Claim.js";
import type { ClaimEvidence } from "../../contracts/ClaimEvidence.js";
import type { Evidence } from "../../contracts/Evidence.js";
import type { OptimizedKnowledgeBundle } from "../../contracts/OptimizedKnowledgeBundle.js";

export class EvidenceExtractor {

    extract(

        claims: Claim[],

        bundle: OptimizedKnowledgeBundle

    ): ClaimEvidence[] {

        const results: ClaimEvidence[] = [];

        for (const claim of claims) {

            const evidence =
                this.findEvidence(
                    claim,
                    bundle
                );

            results.push({

                claim,

                evidence

            });

        }

        return results;

    }

    private findEvidence(

        claim: Claim,

        bundle: OptimizedKnowledgeBundle

    ): Evidence[] {

        const keywords =
            this.extractKeywords(
                claim.text
            );

        const evidence: Evidence[] = [];

        for (const document of bundle.documents) {

            for (const context of document.contexts) {

                const searchable = (

                    context.headings.join(" ")

                    + " "

                    + context.content

                ).toLowerCase();

                const matchedKeywords =

                    keywords.filter(

                        keyword =>

                            searchable.includes(
                                keyword
                            )

                    );

                if (

                    matchedKeywords.length === 0

                ) {

                    continue;

                }

                evidence.push({

                    documentId:
                        document.documentId,

                    title:
                        document.title,

                    headings:
                        context.headings,

                    content:
                        context.content,

                    score:

                        matchedKeywords.length /

                        keywords.length

                });

            }

        }

        evidence.sort(

            (left, right) =>

                right.score - left.score

        );

        return evidence.slice(0, 5);

    }

    private extractKeywords(
        text: string
    ): string[] {

        return text

            .toLowerCase()

            .replace(/[^a-z0-9 ]/g, " ")

            .split(/\s+/)

            .filter(

                word =>

                    word.length > 3

            );

    }

}