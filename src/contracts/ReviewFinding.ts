export interface ReviewFinding {

    category: string;

    severity:
        | "info"
        | "warning"
        | "error";

    title: string;

    description: string;

    recommendation: string;

}