export class SimpleProduct {
    id: number;
    name: string;
    description: string;
    category: string;
    model: string;
    brand: string;
    price: number;
    quantity: number;
    on_offer: boolean;
    discount: number;
    featured: boolean;
    image: string;
    deleted: number;

    public constructor(
        id: number,
        name: string,
        description: string,
        category: string,
        model:string,
        brand: string,
        price: number,
        quantity: number,
        on_offer: boolean,
        discount: number,
        featured: boolean,
        image: string,
        deleted: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.model = model;
        this.brand = brand;
        this.price = price;
        this.quantity = quantity;
        this.on_offer = on_offer;
        this.discount = discount;
        this.featured = featured;
        this.image = image;
        this.deleted = deleted;
    }
}