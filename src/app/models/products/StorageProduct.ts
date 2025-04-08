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
        category: string,
        model: string,
        brand: string,
        price: number,
        quantity: number,
        on_offer: boolean,
        discount: number,
        featured: boolean,
        image: string,
        points: number,
        type: string,
        capacity: number,
        rpm: number,
        read_speed: number,
        write_speed: number,
    ) {
        super(name, description, category, model, brand, price, quantity, on_offer, discount, featured, image, points);
        this.type = type;
        this.capacity = capacity;
        this.rpm = rpm;
        this.read_speed = read_speed;
        this.write_speed = write_speed;
    }
}