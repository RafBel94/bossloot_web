export class Product {
    name: string;
    description: string;
    category_id: number;
    brand_id: number;
    model: string;
    price: number;
    quantity: number;
    on_offer: boolean;
    discount: number;
    featured: boolean;
    image: string;
    deleted: boolean;

    public constructor(
        name: string,
        description: string,
        category_id: number,
        brand_id: number,
        model:string,
        price: number,
        quantity: number,
        on_offer: boolean,
        discount: number,
        featured: boolean,
        image: string,
        deleted: boolean
    ) {
        this.name = name;
        this.description = description;
        this.model = model;
        this.price = price;
        this.quantity = quantity;
        this.on_offer = on_offer;
        this.discount = discount;
        this.featured = featured;
        this.image = image;
        this.deleted = deleted;
        this.category_id = category_id;
        this.brand_id = brand_id;
    }
}