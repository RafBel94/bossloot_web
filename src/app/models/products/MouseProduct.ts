import { Product } from "./Product";

export class MouseProduct extends Product {
    public dpi: number;
    public sensor: string;
    public buttons: number;
    public bluetooth: boolean;
    public weight: number;

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
        dpi: number,
        sensor: string,
        buttons: number,
        bluetooth: boolean,
        weight: number
    ) {
        super(name, description, category, model, brand, price, quantity, on_offer, discount, featured, image);
        this.dpi = dpi;
        this.sensor = sensor;
        this.buttons = buttons;
        this.bluetooth = bluetooth;
        this.weight = weight;
    }
}