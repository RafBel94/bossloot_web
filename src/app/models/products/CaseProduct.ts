import { Product } from "./Product";

export class CaseProduct extends Product {
    

    public constructor(
        name: string,
        description: string,
        category: string,
        model: string,
        brand: string,
        price: number,
        quantity: number,
        on_offer: boolean,
        discount: number,
        featured: boolean,
        image: string,
    ) {
        super(name, description, category, model, brand, price, quantity, on_offer, discount, featured, image);
        
    }
}