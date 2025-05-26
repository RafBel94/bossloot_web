import { Product } from "./Product";

export class RamProduct extends Product {
    speed: number;
    memory: number;
    memory_type: string;
    latency: number;

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
        deleted: boolean,
        speed: number,
        memory: number,
        memory_type: string,
        latency: number
    ) {
        super(name, description, category_id, brand_id, model, price, quantity, on_offer, discount, featured, image, deleted);
        this.speed = speed;
        this.memory = memory;
        this.memory_type = memory_type;
        this.latency = latency;
    }
}