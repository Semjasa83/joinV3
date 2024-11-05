import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact, Address } from "../../interfaces/contact.interface";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private API_URL =  `${environment.apiUrl}/api/`;

  private contacts = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contacts.asObservable();

  private contactIdSubject = new BehaviorSubject<string>('');
  contactId$: Observable<string> = this.contactIdSubject.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public async getAllContacts() {
    return lastValueFrom(this.http.get<Contact[]>(this.API_URL + 'contacts')).then((data: any) => {  this.contacts.next(data['contacts']) });
  };

  public async getContact(id: string) {
    return lastValueFrom(this.http.get<Address>(this.API_URL + `contacts/${id}`));
  };

  public getSpecContact(id: string): Observable<{ contact: Contact }> {
    return this.http.get<{ contact: Address }>(this.API_URL + `contacts/${id}`);
  }

  public async updateContact(id: string, contact: Address) {
    return firstValueFrom(this.http.put<Address>(this.API_URL + `contacts/${id}`, contact, this.httpOptions));
  };

  public async deleteContact(id: string) {
    return lastValueFrom(this.http.delete<Contact>(this.API_URL + `contacts/${id}`));
  };

  public async addContact(contact: Contact) {
    return lastValueFrom(this.http.post<Contact>(this.API_URL + 'contacts', contact, this.httpOptions)).then((data: any) => {  window.location.reload() });
  };

  public setContactId(id: string): void {
    this.contactIdSubject.next(id);
  }


  // Polling function for delete and export to contacts.component.ts
  // public startPolling(interval: number = 5000): void {
  //   this.pollingInterval = setInterval(async () => {
  //     await this.getAllContacts();
  //   }, interval);
  // }
  //
  // public stopPolling(): void {
  //   clearInterval(this.pollingInterval);
  // }
}
