export interface ArchitectureReport {

    overall: "pass" | "warning" | "fail";

    violations: ArchitectureViolation[];

}

export interface ArchitectureViolation {

    category:

        | "authority"

        | "terminology"

        | "knowledge"

        | "ownership";

    severity:

        | "low"

        | "medium"

        | "high";

    message: string;

}