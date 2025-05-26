import { Product } from "./Product";

export class CaseProduct extends Product {
    public caseType: string;
    public formFactorSupport: string;
    public temperedGlass: boolean;
    public expansionSlots: number;
    public maxGpuLength: number;
    public maxCpuCoolerHeight: number;
    public radiatorSupport: boolean;
    public extraFansConnectors: number;
    public depth: number;
    public width: number;
    public height: number;
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
        points: number,
        deleted: boolean,
        caseType: string,
        formFactorSupport: string,
        temperedGlass: boolean,
        expansionSlots: number,
        maxGpuLength: number,
        maxCpuCoolerHeight: number,
        radiatorSupport: boolean,
        extraFansConnectors: number,
        depth: number,
        width: number,
        height: number,
        weight: number
    ) {
        super(name, description, category_id, brand_id, model, price, quantity, on_offer, discount, featured, image, points, deleted);
        this.caseType = caseType;
        this.formFactorSupport = formFactorSupport;
        this.temperedGlass = temperedGlass;
        this.expansionSlots = expansionSlots;
        this.maxGpuLength = maxGpuLength;
        this.maxCpuCoolerHeight = maxCpuCoolerHeight;
        this.radiatorSupport = radiatorSupport;
        this.extraFansConnectors = extraFansConnectors;
        this.depth = depth;
        this.width = width;
        this.height = height;
        this.weight = weight;
    }
}