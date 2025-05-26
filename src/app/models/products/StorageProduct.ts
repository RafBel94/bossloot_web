import { Product } from "./Product";

export class StorageProduct extends Product {
    type: string;
    capacity: number;
    rpm: number;
    read_speed: number;
    write_speed: number;

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
        capacity: number,
        rpm: number,
        read_speed: number,
        write_speed: number,
    ) {
        super(name, description, category_id, brand_id, model, price, quantity, on_offer, discount, featured, image, points, deleted);
        this.type = type;
        this.capacity = capacity;
        this.rpm = rpm;
        this.read_speed = read_speed;
        this.write_speed = write_speed;
    }
}