import type { FeatureSpec } from "./FeatureSpec.js";
import type { Manifest } from "./Manifest.js";
import type { Terminology } from "./Terminology.js";
import type { KnowledgeDocument } from "./KnowledgeDocument.js";
import type { SearchResult } from "../pipeline/knowledge/SearchResult.js";

export interface KnowledgeBundle {

    feature?: FeatureSpec;

    query?: string;

    manifest: Manifest;

    terminology: Terminology;

    documents: KnowledgeDocument[];

    matches?: SearchResult[];

}