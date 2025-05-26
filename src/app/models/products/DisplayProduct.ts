import { Product } from "./Product";

export class DisplayProduct extends Product {
    public resolution: string;
    public refresh_rate: number;
    public response_time: number;
    public panel_type: string;
    public aspect_ratio: string;
    public curved: boolean;
    public brightness: number;
    public contrast_ratio: string;
    public sync_type: string;
    public hdmi_ports: number;
    public display_ports: number;
    public inches: number;
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
        resolution: string,
        refresh_rate: number,
        response_time: number,
        panel_type: string,
        aspect_ratio: string,
        curved: boolean,
        brightness: number,
        contrast_ratio: string,
        sync_type: string,
        hdmi_ports: number,
        display_ports: number,
        inches: number,
        weight: number
    ) {
        super(name, description, category_id, brand_id, model, price, quantity, on_offer, discount, featured, image, points, deleted);
        this.resolution = resolution;
        this.refresh_rate = refresh_rate;
        this.response_time = response_time;
        this.panel_type = panel_type;
        this.aspect_ratio = aspect_ratio;
        this.curved = curved;
        this.brightness = brightness;
        this.contrast_ratio = contrast_ratio;
        this.sync_type = sync_type;
        this.hdmi_ports = hdmi_ports;
        this.display_ports = display_ports;
        this.inches = inches;
        this.weight = weight;
    }
}