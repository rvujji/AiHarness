import type {
    Terminology,
    TerminologyValidationReport,
    TerminologyViolation
} from "../../contracts/Terminology.js";

export class TerminologyValidator {

    validate(

        response: string,

        terminology: Terminology

    ): TerminologyValidationReport {

        const violations: TerminologyViolation[] = [];

        //--------------------------------------------------
        // Canonical vocabulary
        //--------------------------------------------------

        const canonical = new Set(

            terminology.terms.map(

                term =>

                    term.name.toLowerCase()

            )

        );

        //--------------------------------------------------
        // Candidate terms
        //--------------------------------------------------

        const candidates =
            this.extractCandidates(response);

        //--------------------------------------------------
        // Validate
        //--------------------------------------------------

        for (const candidate of candidates) {

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
                    "Term is not defined in terminology.yaml.",

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

                /\b([A-Z][a-z0-9]+(?:\s+[A-Z][a-z0-9]+)*)\b/g

            ) ?? [];

        return [

            ...new Set(matches)

        ];

    }

}