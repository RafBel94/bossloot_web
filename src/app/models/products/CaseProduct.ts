import { Product } from "./Product";

export class CaseProduct extends Product {
    public caseType: string;
    public formFactorSupport: string;
    public sidePanel: boolean;
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
        category: string,
        model: string,
        brand: string,
        price: number,
        quantity: number,
        on_offer: boolean,
        discount: number,
        featured: boolean,
        image: string,
        caseType: string,
        formFactorSupport: string,
        sidePanel: boolean,
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
        super(name, description, category, model, brand, price, quantity, on_offer, discount, featured, image);
        this.caseType = caseType;
        this.formFactorSupport = formFactorSupport;
        this.sidePanel = sidePanel;
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