export class ValorationUser {
    id: number;
    name: string;
    profile_picture: string | null;
    level: number;

    constructor(id: number, name: string, profile_picture: string, level: number) {
        this.id = id;
        this.name = name;
        this.profile_picture = profile_picture;
        this.level = level;
    }
}