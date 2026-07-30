export class CosineSimilarity {

    static calculate(
        left: number[],
        right: number[]
    ): number {

        if (left.length !== right.length) {

            throw new Error(
                "Embedding dimensions do not match."
            );

        }

        let dot = 0;
        let leftNorm = 0;
        let rightNorm = 0;

        for (let i = 0; i < left.length; i++) {

            dot += left[i] * right[i];

            leftNorm += left[i] * left[i];

            rightNorm += right[i] * right[i];

        }

        return dot /
            (
                Math.sqrt(leftNorm) *
                Math.sqrt(rightNorm)
            );

    }

}