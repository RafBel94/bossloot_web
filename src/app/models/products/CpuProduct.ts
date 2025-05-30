import { Product } from "./Product";

export class CpuProduct extends Product {
    socket: string;
    core_count: number;
    thread_count: number;
    base_clock: number;
    boost_clock: number;
    consumption: number;
    integrated_graphics: boolean;

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
        socket: string,
        core_count: number,
        thread_count: number,
        base_clock: number,
        boost_clock: number,
        consumption: number,
        integrated_graphics: boolean
    ) {
        super(name, description, category_id, brand_id, model, price, quantity, on_offer, discount, featured, image, deleted);
        this.socket = socket;
        this.core_count = core_count;
        this.thread_count = thread_count;
        this.base_clock = base_clock;
        this.boost_clock = boost_clock;
        this.consumption = consumption;
        this.integrated_graphics = integrated_graphics;
    }
}