import { readFileSync } from "fs";

import { ReviewParser }
    from "../src/pipeline/promptverification/ReviewParser.js";

const markdown =
    readFileSync(
        "./samples/review.md",
        "utf8"
    );

const parser =
    new ReviewParser();

const review =
    parser.parse(markdown);

console.dir(
    review,
    { depth: null }
);