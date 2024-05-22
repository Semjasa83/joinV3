import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private API_URL = 'http://localhost:3000/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { } // Inject the HttpClient module

  public getAllContacts() {
    return this.http.get<Contact[]>(this.API_URL + 'contacts');
  };

  public getContact(id: number) {
    return this.http.get<Contact[]>(this.API_URL + `contacts/:${id}`);
  };

  public updateContact(id: number, contact: Contact) {
    return this.http.put<Contact[]>(this.API_URL + `contacts/:${id}`, contact, this.httpOptions);
  };

  public deleteContact(id: number) {
    return this.http.delete<Contact[]>(this.API_URL + `contacts/:${id}`);
  };

  public addContact(contact: Contact) {
    return this.http.post<Contact[]>(this.API_URL + 'contacts', contact, this.httpOptions);
  };
}
