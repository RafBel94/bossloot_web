import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() : Observable<any> {
    return this.http.get('http://localhost:8000/api/users');
  }

  getUserById(id: number) : Observable<any> {
    return this.http.get('http://localhost:8000/api/users/' + id);
  }

  updateUser(id: number, data: any) : Observable<any> {
    return this.http.put('http://localhost:8000/api/users/' + id, data);
  }

  deleteUser(id: number) : Observable<any> {
    return this.http.delete('http://localhost:8000/api/users/' + id);
  }
}
