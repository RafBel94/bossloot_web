import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseUrl = 'bossloot-kbsiw.ondigitalocean.app/api';

    constructor(private http: HttpClient) { }

    loginUser(email: string, password: string) : Observable<any> {
        return this.http.post(this.baseUrl + '/login', {email, password});
    }

    logoutUser() {
        localStorage.removeItem('bosslootUsername');
        localStorage.removeItem('bosslootUser');
        localStorage.removeItem('bosslootToken');
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('bosslootUser') !== null;
    }
}