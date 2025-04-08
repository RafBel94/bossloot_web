export class Product {
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
    points: number;

    public constructor(
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
        points: number,
    ) {
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
        this.points = points;
    }
}