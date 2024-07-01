
export interface Product {
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    brand: string;
    unitsInStock: number;
    category: string;
}

export interface ProductParams {
    sort: string;
    name? : string;
    categories?: string[];
    brands?: string[];
    pageNumber: number;
    pageSize: number;
}