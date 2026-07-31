import { KnowledgeResolver } from "./pipeline/knowledge/KnowledgeResolver.js";
import { Indexer } from "./pipeline/knowledge/Indexer.js";
import { AskService } from "./services/AskService.js";
import { GenerationService } from "./services/GenerationService.js";
import { ConsolePrinter } from "./presentation/ConsolePrinter.js";

const [, , command, target] = process.argv;

switch (command) {

    case "resolve": {

        const resolver = new KnowledgeResolver();

        const bundle = resolver.resolve(
                target ?? "./feature-specs/example.yaml"
            );

        ConsolePrinter.printKnowledgeBundle(bundle);

        break;
    }

    case "index": {

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

        ConsolePrinter.printEmbeddingIndex(index);

        break;

    }

    case "ask": {

        const question = process.argv.slice(3).join(" ");
        const service = new AskService();

        const bundle = await service.ask(question);
        ConsolePrinter.printOptimizedKnowledge(bundle);

        break;

    }

    case "generate": {

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

        ConsolePrinter.printGenerationResult(result);

        break;

    }
    default:

        console.log(
            "Usage: pnpm dev resolve <feature-spec.yaml>"
        );
}
