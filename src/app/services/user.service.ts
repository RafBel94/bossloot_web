import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getUsers() : Observable<any> {
    return this.http.get(this.baseUrl + '/users');
  }

  getUserById(id: number) : Observable<any> {
    return this.http.get(this.baseUrl + '/users/' + id);
  }

  updateUser(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/${id}`, formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  deleteUser(id: number) : Observable<any> {
    return this.http.delete(this.baseUrl + '/users/' + id);
  }
}
