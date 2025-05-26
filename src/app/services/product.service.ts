import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/products');
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/api/products/' + id);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + '/api/products', formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/products/${id}`, formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/products/' + id);
  }

  restoreProduct(id: number): Observable<any> {
    return this.http.post(this.baseUrl + '/api/products/restore/' + id, {});
  }
}
