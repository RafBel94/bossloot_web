import { Product } from "./Product";

export class GpuProduct extends Product {
    memory: number;
    memory_type: string;
    core_clock: number;
    boost_clock: number;
    consumption: number;
    length: number;

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
        memory: number,
        memory_type: string,
        core_clock: number,
        boost_clock: number,
        consumption: number,
        length: number,
    ) {
        super(name, description, category_id, brand_id, model, price, quantity, on_offer, discount, featured, image, deleted);
        this.memory = memory;
        this.memory_type = memory_type;
        this.core_clock = core_clock;
        this.boost_clock = boost_clock;
        this.consumption = consumption;
        this.length = length;
    }
}