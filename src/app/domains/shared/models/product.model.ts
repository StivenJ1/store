export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    creationAt: string;
    category: Category;
}

export interface Category {
    id: number;
    name: string;
    image: string[];
}