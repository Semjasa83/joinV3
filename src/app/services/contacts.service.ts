import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private API_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.API_URL);
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(this.API_URL + id);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.API_URL, contact);
  }

  updateContact(id: string, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.API_URL + id, contact);
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(this.API_URL + id);
  }
}
