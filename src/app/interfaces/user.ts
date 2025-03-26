export interface User {
    id: number;
    name: string;
    email: string;
    mobile_phone: string | null;
    adress_1: string | null;
    adress_2: string | null;
    level: number;
    points: number;
    email_confirmed: boolean;
    activated: boolean;
    profile_picture: string | null;
}