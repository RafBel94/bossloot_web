import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBrands(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/brands');
  }

  getBrandById(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/api/brands/' + id);
  }

  addBrand(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + '/api/brands', formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  updateBrand(id: number, formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + '/api/brands/' + id, formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/brands/' + id);
  }
}
