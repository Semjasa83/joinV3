import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiContactsUrl = 'http://localhost:3000/api/contacts';

  constructor( private http: HttpClient) {
    this.getAllContacts()
  }

  getAllContacts(): Observable<any> {
    console.log(this.apiContactsUrl);
    return this.http.get(this.apiContactsUrl);
  }

  getContactsById(id: number): Observable<any> {
    return this.http.get(this.apiContactsUrl + `/${id}`);
  }

  createContacts(contact: any): Observable<any> {
    return this.http.post(this.apiContactsUrl, contact);
  }

  updateContacts(id: number, contact: any): Observable<any> {
    return this.http.put(this.apiContactsUrl + `/${id}`, contact);
  }

  deleteContacts(id: number): Observable<any> {
    return this.http.delete(this.apiContactsUrl + `/${id}`);
  }
}
