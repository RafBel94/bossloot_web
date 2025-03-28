export class Product {
    name: string;
    description: string;
    category: string;
    model: string;
    brand: string;
    price: number;
    quantity: number;
    on_sale: boolean;
    featured: boolean;
    image: string;

    public constructor(
        name: string,
        description: string,
        category: string,
        model:string,
        brand: string,
        price: number,
        quantity: number,
        on_sale: boolean,
        featured: boolean,
        image: string
    ) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.model = model;
        this.brand = brand;
        this.price = price;
        this.quantity = quantity;
        this.on_sale = on_sale;
        this.featured = featured;
        this.image = image;

    }
}