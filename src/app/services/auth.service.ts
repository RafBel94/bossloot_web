import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    loginUser(email: string, password: string) : Observable<any> {
        return this.http.post(this.baseUrl + '/api/login', {email, password});
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