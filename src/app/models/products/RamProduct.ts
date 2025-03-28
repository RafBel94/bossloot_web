import { Product } from "./Product";

export class RamProduct extends Product {
    speed: number;
    memory: number;
    memory_type: string;
    latency: number;

    public constructor(
        name: string,
        description: string,
        category: string,
        model: string,
        brand: string,
        price: number,
        quantity: number,
        on_sale: boolean,
        featured: boolean,
        image: string,
        speed: number,
        memory: number,
        memory_type: string,
        latency: number
    ) {
        super(name, description, category, model, brand, price, quantity, on_sale, featured, image);
        this.speed = speed;
        this.memory = memory;
        this.memory_type = memory_type;
        this.latency = latency;
    }
}