export interface Terminology {

    terms: CanonicalTerm[];

}

export interface CanonicalTerm {

    name: string;

    description: string;

}

export interface TerminologyViolation {

    text: string;

    severity:
        | "warning"
        | "error";

    reason: string;

    suggestion?: string;

}

export interface TerminologyValidationReport {

    total: number;

    violations: TerminologyViolation[];

}