import type { Claim }
    from "../../contracts/Claim.js";

export class ClaimExtractor {

    extract(
        response: string
    ): Claim[] {

        const cleaned =

            response

                .replace(/```[\s\S]*?```/g, "")

                .replace(/\r/g, "");

        const claims: Claim[] = [];

        let id = 1;

        for (

            const line of cleaned.split("\n")

        ) {

            const text =
                line.trim();

            if (

                text.length < 15

            ) {

                continue;

            }

            claims.push({

                id,

                text

            });

            id++;

        }

        return claims;

    }

}