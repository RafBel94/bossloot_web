import { Product } from "./Product";

export class MotherboardProduct extends Product {
    public socket: string;
    public chipset: string;
    public form_factor: string;
    public memory_max: number;
    public memory_slots: number;
    public memory_type: string;
    public memory_speed: number;
    public sata_ports: number;
    public m_2_slots: number;
    public pcie_slots: number;
    public usb_ports: number;
    public lan: string;
    public audio: string;
    public wifi: boolean;
    public bluetooth: boolean;

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
        points: number,
        socket: string,
        chipset: string,
        form_factor: string,
        memory_max: number,
        memory_slots: number,
        memory_type: string,
        memory_speed: number,
        sata_ports: number,
        m_2_slots: number,
        pcie_slots: number,
        usb_ports: number,
        lan: string,
        audio: string,
        wifi: boolean,
        bluetooth: boolean
    ) {
        super(name, description, category, model, brand, price, quantity, on_offer, discount, featured, image, points);
        this.socket = socket;
        this.chipset = chipset;
        this.form_factor = form_factor;
        this.memory_max = memory_max;
        this.memory_slots = memory_slots;
        this.memory_type = memory_type;
        this.memory_speed = memory_speed;
        this.sata_ports = sata_ports;
        this.m_2_slots = m_2_slots;
        this.pcie_slots = pcie_slots;
        this.usb_ports = usb_ports;
        this.lan = lan;
        this.audio = audio;
        this.wifi = wifi;
        this.bluetooth = bluetooth;
    }
}