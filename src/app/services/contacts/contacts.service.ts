import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private API_URL = 'http://localhost:3000/api/';
  private contactsSubject = new Subject<Contact[]>();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.fetchContacts();
  }

  private fetchContacts(): void {
    this.http.get<Contact[]>(this.API_URL + 'contacts').subscribe(contacts => {
      this.contactsSubject.next(contacts);
    });
  }

  getAllContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + `contacts/${id}`).pipe(
      tap(() => {
        this.fetchContacts(); // Fetch contacts again when a contact is deleted
      })
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.API_URL + 'contacts', contact, this.httpOptions).pipe(
      tap(() => {
        this.fetchContacts(); // Fetch contacts again when a contact is added
      })
    );
  }

  // public getAllContacts() {
  //   this.http.get<Contact[]>(this.API_URL + 'contacts').subscribe(contacts => {
  //     this.contactsSubject.next(contacts);
  //   });
  //   return this.contactsSubject.asObservable()
  // };

  // public getContact(id: number) {
  //   return this.http.get<Contact[]>(this.API_URL + `contacts/${id}`);
  // };

  // public updateContact(id: number, contact: Contact) {
  //   return this.http.put<Contact[]>(this.API_URL + `contacts/${id}`, contact, this.httpOptions);
  // };

  // public deleteContact(id: number) {
  //   return this.http.delete<Contact[]>(this.API_URL + `contacts/${id}`).pipe(
  //     tap(() => { 
  //       this.contactsSubject.next(value: Contact[]); // Emit a new value when a contact is deleted
  //     })
  //   );
  // };

  // public addContact(contact: Contact) {
  //   return this.http.post<Contact[]>(this.API_URL + 'contacts', contact, this.httpOptions);
  // };
}


