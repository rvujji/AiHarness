export interface Authority {

    documents: AuthorityDocument[];

}

export interface AuthorityDocument {

    id: string;

    title: string;

    path: string;

    priority: number;

}