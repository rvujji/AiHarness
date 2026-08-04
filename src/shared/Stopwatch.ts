export class Stopwatch {

    private readonly startedAt =

        Date.now();

    elapsed(): string {

        const elapsed =

            Date.now() -

            this.startedAt;

        return Stopwatch.format(

            elapsed

        );

    }

    elapsedMs(): number {

        return Date.now()

            - this.startedAt;

    }

    static format(
        milliseconds: number
    ): string {

        const hours =

            Math.floor(

                milliseconds /

                3_600_000

            );

        milliseconds %=

            3_600_000;

        const minutes =

            Math.floor(

                milliseconds /

                60_000

            );

        milliseconds %=

            60_000;

        const seconds =

            Math.floor(

                milliseconds /

                1_000

            );

        const ms =

            milliseconds %

            1_000;

        return [

            hours

                .toString()

                .padStart(2, "0"),

            minutes

                .toString()

                .padStart(2, "0"),

            seconds

                .toString()

                .padStart(2, "0")

        ].join(":")

        + "."

        + ms

            .toString()

            .padStart(3, "0");

    }

}