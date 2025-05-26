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
        dpi: number,
        sensor: string,
        buttons: number,
        bluetooth: boolean,
        weight: number
    ) {
        super(name, description, category_id, brand_id, model, price, quantity, on_offer, discount, featured, image, deleted);
        this.dpi = dpi;
        this.sensor = sensor;
        this.buttons = buttons;
        this.bluetooth = bluetooth;
        this.weight = weight;
    }
}