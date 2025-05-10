import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get all contact forms
  getContactForms() : Observable<any> {
      return this.http.get(this.baseUrl + '/api/contact-forms');
  }

  // Get contact form by ID
  getContactFormById(id: number) : Observable<any> {
      return this.http.get(this.baseUrl + '/api/contact-forms/' + id);
  }

  // Resolve contact form by ID
  resolveContactForm(id: number, answer: string) : Observable<any> {
      return this.http.put(this.baseUrl + '/api/contact-forms/' + id + '/resolve', {answer});
  }

  // Delete contact form by ID
  deleteContactForm(id: number) : Observable<any> {
      return this.http.delete(this.baseUrl + '/api/contact-forms/' + id);
  }
}
