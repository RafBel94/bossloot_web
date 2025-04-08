import { Product } from "./Product";

export class CoolerProduct extends Product {
    public type: string;
    public fan_rpm: number;
    public consumption: number;
    public socket_support: string;
    public width: number;
    public height: number;

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
        fan_rpm: number,
        consumption: number,
        socket_support: string,
        width: number,
        height: number
    ) {
        super(name, description, category, model, brand, price, quantity, on_offer, discount, featured, image, points);
        this.type = type;
        this.fan_rpm = fan_rpm;
        this.consumption = consumption;
        this.socket_support = socket_support;
        this.width = width;
        this.height = height;
    }
}