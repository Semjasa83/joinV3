import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact, Address } from "../../interfaces/contact.interface";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private API_URL = 'http://localhost:3000/api/';
  private URL_PARAM = 'contacts'; 
  
  private contacts = new BehaviorSubject<any>([]);
  contacts$ = this.contacts.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public async getAllContacts() {
    return lastValueFrom(this.http.get<Contact[]>(this.API_URL + 'contacts')).then((data: any) => {  this.contacts.next(data['contacts']) });
  };

  public async getContact(id: string) {
    return lastValueFrom(this.http.get<Contact[]>(this.API_URL + `contacts/${id}`));
  };

  public async updateContact(id: string, contact: Contact) {
    return firstValueFrom(this.http.put<Contact[]>(this.API_URL + `contacts/${id}`, contact, this.httpOptions));
  };

  public async deleteContact(id: string) {
    return lastValueFrom(this.http.delete<Contact[]>(this.API_URL + `contacts/${id}`));
  };

  public async addContact(contact: Contact) {
    return lastValueFrom(this.http.post<Contact[]>(this.API_URL + 'contacts', contact, this.httpOptions)).then((data: any) => {  window.location.reload() });
  };
}
