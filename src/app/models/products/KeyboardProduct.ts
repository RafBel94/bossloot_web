import { Product } from "./Product";

export class KeyboardProduct extends Product {
    public type: string;
    public switch_type: string;
    public width: number;
    public height: number;
    public weight: number;

    public constructor(
        name: string,
        description: string,
        category_id: number,
        brand_id: number,
        model: string,
        price: number,
        quantity: number,
        on_offer: boolean,
        discount: number,
        featured: boolean,
        image: string,
        points: number,
        deleted: boolean,
        type: string,
        switch_type: string,
        width: number,
        height: number,
        weight: number
    ) {
        super(name, description, category_id, brand_id, model, price, quantity, on_offer, discount, featured, image, points, deleted);
        this.type = type;
        this.switch_type = switch_type;
        this.width = width;
        this.height = height;
        this.weight = weight;
    }
}