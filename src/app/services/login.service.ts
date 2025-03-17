import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loggedIn = false;

    constructor(private http: HttpClient) { }

    loginUser(email: string, password: string) : Observable<any> {
        return this.http.post('http://localhost:8000/api/login', {email, password});
    }

    setLoggedIn(value: boolean) {
        this.loggedIn = value;
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }
}