import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl + '/products');
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/products/' + id);
  }

  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/${id}`, formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/products/' + id);
  }
}
