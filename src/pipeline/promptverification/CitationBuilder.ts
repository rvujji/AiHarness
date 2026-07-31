import type { VerificationResult }
    from "../../contracts/VerificationResult.js";

export class CitationBuilder {

    build(
        results: VerificationResult[]
    ): string {

        const lines: string[] = [];

        for (const result of results) {

            //
            // Status
            //

            switch (result.status) {

                case "supported":

                    lines.push(
                        `✓ ${result.claim.text}`
                    );

                    break;

                case "partial":

                    lines.push(
                        `⚠ ${result.claim.text}`
                    );

                    break;

                case "missing":

                    lines.push(
                        `✗ ${result.claim.text}`
                    );

                    break;

                case "contradicted":

                    lines.push(
                        `✗ ${result.claim.text}`
                    );

                    break;

            }

            //
            // Evidence
            //

            if (result.evidence.length === 0) {

                lines.push(
                    "No supporting evidence found."
                );

            }

            else {

                lines.push("Evidence:");

                for (const evidence of result.evidence) {

                    lines.push(

                        `• ${evidence.title} > ${evidence.headings.join(" > ")}`

                    );

                }

            }

            lines.push("");

        }

        return lines.join("\n");

    }

}