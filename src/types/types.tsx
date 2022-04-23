export interface IProduct {
    id: number;
    model: string;
    name: string;
    image: string;
    price: string;
    special: string;
    priceInCents: number;
    specialInCents: number;
    description: string;
    sizes: string[];
}

export interface ICartProduct {
    id: number;
    model: string;
    name: string;
    image: string;
    price: string;
    special: string;
    priceInCents: number;
    specialInCents: number;
    description: string;
    sizes: string[];
    size: string;
}