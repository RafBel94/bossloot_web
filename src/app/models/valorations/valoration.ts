import { ValorationProduct } from "./valoration-product";
import { ValorationUser } from "./valoration-user";

export class Valoration {
    id: number;
    userId: number;
    productId: number;
    rating: number;
    comment: string;
    image: string | null;
    verified: boolean;
    user: ValorationUser;
    product: ValorationProduct;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        userId: number,
        productId: number,
        rating: number,
        comment: string,
        image: string | null,
        verified: boolean,
        user: ValorationUser,
        product: ValorationProduct,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.rating = rating;
        this.comment = comment;
        this.image = image;
        this.verified = verified;
        this.user = user;
        this.product = product;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}