import type { KnowledgeBundle } from "../../contracts/KnowledgeBundle.js";
import type { Manifest } from "../../contracts/Manifest.js";
import type { Terminology } from "../../contracts/Terminology.js";
import type { KnowledgeDocument } from "../../contracts/KnowledgeDocument.js";
import type { SearchResult } from "./SearchResult.js";

export class KnowledgeBundleBuilder {

    build(

        query: string,

        manifest: Manifest,

        terminology: Terminology,

        documents: KnowledgeDocument[],

        matches: SearchResult[]

    ): KnowledgeBundle {

        return {

            query,

            manifest,

            terminology,

            documents,

            matches

        };

    }

}