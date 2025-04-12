import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/categories');
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/api/categories/' + id);
  }
}
