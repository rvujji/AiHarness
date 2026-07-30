import { KnowledgeResolver } from "./pipeline/knowledge/KnowledgeResolver.js";
import { Indexer } from "./pipeline/knowledge/Indexer.js";
import { AskService } from "./services/AskService.js";

const [, , command, target] = process.argv;

switch (command) {

    case "resolve": {

        const resolver = new KnowledgeResolver();

        const bundle = resolver.resolve(
                target ?? "./feature-specs/example.yaml"
            );

        console.log("\nKnowledge Bundle");
        console.log("================");

        // console.log(`Feature     : ${bundle.feature.title}`);
        console.log(`Documents   : ${bundle.documents.length}`);

        console.log("\nAuthority Order");

        for (const document of bundle.documents) {

            console.log(
                `${document.priority} - ${document.title}`
            );

        }

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

        await indexer.index(
            bundle.documents
        );

        break;

    }

    case "ask": {

        const question = process.argv.slice(3).join(" ");
        const service = new AskService();

        const bundle = await service.ask(question);
        console.log();

        console.log("Optimized Knowledge Bundle");
        console.log("==========================");

        console.log(`Query      : ${bundle.query}`);
        console.log(`Documents  : ${bundle.statistics.documents}`);
        console.log(`Contexts   : ${bundle.statistics.chunks}`);
        console.log(`Tokens     : ${bundle.statistics.tokenCount}`);

        console.log();

        for (const document of bundle.documents) {

            console.log(
                `[Priority ${document.priority}] [Relevance ${document.relevance.toFixed(4)}]`
            );

            console.log(document.title);

            console.log(
                `Matched Sections: ${document.matchedSections}`
            );

            console.log();

            for (const context of document.contexts) {

                console.log(
                    context.headings.join(" > ")
                );

                console.log();

                console.log(
                    context.content.substring(0, 300)
                );

                console.log();

            }

            console.log(
                "------------------------------------------------------------\n"
            );

        }

        break;

    }

    default:

        console.log(
            "Usage: pnpm dev resolve <feature-spec.yaml>"
        );
}
