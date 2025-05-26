import { Product } from "./Product";

export class PsuProduct extends Product {
    public efficiency_rating: string;
    public wattage: number;
    public modular: boolean;
    public fanless: boolean;

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
        efficiency_rating: string,
        wattage: number,
        modular: boolean,
        fanless: boolean
    ) {
        super(name, description, category_id, brand_id, model, price, quantity, on_offer, discount, featured, image, points, deleted);
        this.efficiency_rating = efficiency_rating;
        this.wattage = wattage;
        this.modular = modular;
        this.fanless = fanless;
    }
}