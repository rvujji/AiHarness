import { YamlLoader } from "../../shared/YamlLoader.js";

import type { FeatureSpec } from "../../contracts/FeatureSpec.js";
import type { Manifest } from "../../contracts/Manifest.js";
import type { Authority } from "../../contracts/Authority.js";
import type { Terminology } from "../../contracts/Terminology.js";
import type { KnowledgeBundle } from "../../contracts/KnowledgeBundle.js";
import { TextLoader } from "../../shared/TextLoader.js";
import type { KnowledgeDocument } from "../../contracts/KnowledgeDocument.js";

export class KnowledgeResolver {

    resolve(featureSpecPath: string): KnowledgeBundle {

        const feature =
            YamlLoader.load<FeatureSpec>(featureSpecPath);

        const manifest =
            YamlLoader.load<Manifest>("./knowledge/manifest.yaml");

        const authority =
            YamlLoader.load<Authority>("./knowledge/authority.yaml");

        const terminology =
            YamlLoader.load<Terminology>("./knowledge/terminology.yaml");
        
        const documents: KnowledgeDocument[] = [];

        for (const document of authority.documents) {

            documents.push({

                id: document.id,

                title: document.title,

                path: document.path,

                priority: document.priority,

                collection:

                    this.extractCollection(

                        document.path

                    ),

                content: TextLoader.load(document.path)

            });

        }

        documents.sort(
            (a, b) => b.priority - a.priority
        );

        return {

            feature,

            manifest,

            terminology,

            documents

        };

    }

    private extractCollection(
        path: string
    ): string {

        const parts =
            path.replace(/\\/g, "/").split("/");

        return parts.length >= 2

            ? parts[1]

            : "";

    }

}