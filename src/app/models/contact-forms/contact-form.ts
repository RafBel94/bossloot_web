export class ContactForm {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    image: string | null;

    constructor(id: number, name: string, email: string, subject: string, message: string, status: string, image: string | null = null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.status = status;
        this.image = image;
    }
}