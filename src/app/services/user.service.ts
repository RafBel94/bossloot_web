import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers() : Observable<any> {
    return this.http.get(this.baseUrl + '/api/users');
  }

  getUserById(id: number) : Observable<any> {
    return this.http.get(this.baseUrl + '/api/users/' + id);
  }

  updateUser(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/${id}`, formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  deleteUser(id: number) : Observable<any> {
    return this.http.delete(this.baseUrl + '/api/users/' + id);
  }
}
