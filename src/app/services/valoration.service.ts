import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ValorationService {

    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // Get all contact forms
    getValorations(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/valorations');
    }

    // Get contact form by ID
    getValorationById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/api/valorations/' + id);
    }

    // Resolve contact form by ID
    verifyValoration(id: number): Observable<any> {
        return this.http.post(this.baseUrl + '/api/valorations/verify/' + id, null);
    }

    // Delete contact form by ID
    deleteValoration(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + '/api/valorations/' + id);
    }
}
