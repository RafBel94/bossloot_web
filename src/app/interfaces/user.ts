export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    level: number;
    points: number;
    profile_picture: string;
    activated: boolean;
    email_confirmed: boolean;
}
