import type { VerificationResult }
    from "../../contracts/VerificationResult.js";

import type { VerificationConfidence }
    from "../../contracts/VerificationConfidence.js";

export class ConfidenceCalculator {

    calculate(

        results: VerificationResult[]

    ): VerificationConfidence {

        if (

            results.length === 0

        ) {

            return {

                overall: 0,

                evidence: 0,

                coverage: 0,

                hallucinationRisk: 1

            };

        }

        //--------------------------------------------------
        // Counts
        //--------------------------------------------------

        const supported =

            results.filter(

                result =>

                    result.status === "supported"

            ).length;

        const partial =

            results.filter(

                result =>

                    result.status === "partial"

            ).length;

        const missing =

            results.filter(

                result =>

                    result.status === "missing"

            ).length;

        //--------------------------------------------------
        // Coverage
        //--------------------------------------------------

        const coverage =

            (

                supported +

                partial * 0.5

            )

            /

            results.length;

        //--------------------------------------------------
        // Evidence confidence
        //--------------------------------------------------

        const evidence =

            results.reduce(

                (sum, result) =>

                    sum + result.confidence,

                0

            )

            /

            results.length;

        //--------------------------------------------------
        // Overall confidence
        //--------------------------------------------------

        const overall =

            (

                coverage * 0.60 +

                evidence * 0.40

            );

        //--------------------------------------------------
        // Hallucination risk
        //--------------------------------------------------

        const hallucinationRisk =

            1 - overall;

        return {

            overall,

            evidence,

            coverage,

            hallucinationRisk

        };

    }

}