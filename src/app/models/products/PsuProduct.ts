import { Product } from "./Product";

export class PsuProduct extends Product {
    public efficiency_rating: string;
    public wattage: number;
    public modular: boolean;
    public fanless: boolean;

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
        efficiency_rating: string,
        wattage: number,
        modular: boolean,
        fanless: boolean
    ) {
        super(name, description, category, model, brand, price, quantity, on_offer, discount, featured, image);
        this.efficiency_rating = efficiency_rating;
        this.wattage = wattage;
        this.modular = modular;
        this.fanless = fanless;
    }
}