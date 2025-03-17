import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }

    loginUser(email: string, password: string) : Observable<any> {
        return this.http.post('http://localhost:8000/api/login', {email, password});
    }

    logoutUser() {
        localStorage.removeItem('angular19User');
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('angular19User') !== null;
    }
}