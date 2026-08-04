import { KnowledgeResolver } from "./pipeline/knowledge/KnowledgeResolver.js";
import { Indexer } from "./pipeline/knowledge/Indexer.js";
import { AskService } from "./services/AskService.js";
import { GenerationService } from "./services/GenerationService.js";
import { ConsolePrinter } from "./presentation/ConsolePrinter.js";
import { ReviewType } from "./contracts/ReviewType.js";
import { ReviewService } from "./services/ReviewService.js";
import { TextLoader } from "./shared/TextLoader.js";
import { Stopwatch } from "./shared/Stopwatch.js";

const [, , command, target] = process.argv;

const timer =
    new Stopwatch();

switch (command) {

    case "resolve": {
        console.log(`[${timer.elapsed()}] Starting resolve...`);

        const resolver = new KnowledgeResolver();

        const bundle = resolver.resolve(
                target ?? "./feature-specs/example.yaml"
            );
        console.log(`[${timer.elapsed()}] Finished resolve...`);
        ConsolePrinter.printKnowledgeBundle(bundle);

        break;
    }

    case "index": {
        console.log(`[${timer.elapsed()}] Starting index...`);

        const resolver =
            new KnowledgeResolver();

        const bundle =
            resolver.resolve(
                "./feature-specs/example.yaml"
            );

        const indexer =
            new Indexer();

        const index = await indexer.index(
            bundle.documents
        );
        console.log(`[${timer.elapsed()}] Finished index...`);

        ConsolePrinter.printEmbeddingIndex(index);

        break;

    }

    case "ask": {
        console.log(`[${timer.elapsed()}] Starting ask...`);

        const question = process.argv.slice(3).join(" ");
        const service = new AskService();

        const bundle = await service.ask(question);
        console.log(`[${timer.elapsed()}] Finished ask...`);

        ConsolePrinter.printOptimizedKnowledge(bundle);

        break;

    }

    case "generate": {
        console.log(`[${timer.elapsed()}] Starting generate...`);

        const question =
            process.argv.slice(3).join(" ");

        const service =
            new GenerationService();

        const result =
            await service.generate(

                question,

                {

                    goal:
                        question,

                    output:
                        "TypeScript",

                    constraints: [

                        "Follow platform architecture",

                        "Use authoritative documents",

                        "Do not invent terminology"

                    ]

                }

            );
        console.log(`[${timer.elapsed()}] Finished generate...`);

        ConsolePrinter.printGenerationResult(result);

        break;

    }

    case "review": {
        console.log(`[${timer.elapsed()}] Starting review...`);

        const first =
            process.argv[3];

        const second =
            process.argv[4];

        const reviewService =
            new ReviewService();

        let reviewType: ReviewType | undefined;

        let artifactPath: string;

        //--------------------------------------------------
        // Explicit reviewer
        //--------------------------------------------------

        if (

            first === "architecture" ||

            first === "ddd" ||

            first === "database" ||

            first === "api" ||

            first === "implementation"

        ) {

            reviewType =
                first;

            artifactPath =
                second;

        }

        //--------------------------------------------------
        // Automatic reviewer
        //--------------------------------------------------

        else {

            artifactPath =
                first;

        }

        if (!artifactPath) {

            console.log(

                "Usage:"

            );

            console.log(

                "  pnpm dev review <artifact>"

            );

            console.log(

                "  pnpm dev review <reviewer> <artifact>"

            );

            break;

        }

        const artifact =

            TextLoader.load(
                artifactPath
            );

        const report =

            await reviewService.review(

                artifactPath,

                {

                    artifact,

                    artifactType:
                        "document"

                },

                reviewType

            );
        console.log(`[${timer.elapsed()}] Finished review...`);

        ConsolePrinter.printReviewReport(
            report
        );

        break;

    }
    default:

        console.log(
            "Usage: pnpm dev resolve <feature-spec.yaml>"
        );
}
