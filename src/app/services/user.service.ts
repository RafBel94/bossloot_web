import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://bossloot-api-uvwil.ondigitalocean.app/api';

  constructor(private http: HttpClient) { }

  getUsers() : Observable<any> {
    return this.http.get(this.baseUrl + '/users');
  }

  getUserById(id: number) : Observable<any> {
    return this.http.get(this.baseUrl + '/users/' + id);
  }

  updateUser(id: number, data: any) : Observable<any> {
    return this.http.put(this.baseUrl + '/users/' + id, data);
  }

  deleteUser(id: number) : Observable<any> {
    return this.http.delete(this.baseUrl + '/users/' + id);
  }
}
