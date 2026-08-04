export interface ReviewRequest {

    artifact: string;

    artifactType:
        | "feature"
        | "code"
        | "database"
        | "api"
        | "document";

}