import type { FeatureSpec } from "./FeatureSpec.js";
import type { Manifest } from "./Manifest.js";
import type { Authority } from "./Authority.js";
import type { Terminology } from "./Terminology.js";
import type { KnowledgeDocument } from "./KnowledgeDocument.js";

export interface KnowledgeBundle {

    feature: FeatureSpec;

    manifest: Manifest;

    terminology: Terminology;

    documents: KnowledgeDocument[];

}