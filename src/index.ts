import { KnowledgeResolver } from "./pipeline/knowledge/KnowledgeResolver.js";
import { Indexer } from "./pipeline/knowledge/Indexer.js";

const [, , command, target] = process.argv;

switch (command) {

    case "resolve": {

        const resolver = new KnowledgeResolver();

        const bundle = resolver.resolve(
                target ?? "./feature-specs/example.yaml"
            );

        console.log("\nKnowledge Bundle");
        console.log("================");

        console.log(`Feature     : ${bundle.feature.title}`);
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

    default:

        console.log(
            "Usage: pnpm dev resolve <feature-spec.yaml>"
        );
}
