import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { Contact } from '../interfaces/contact';
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

  getContacts() {
    return lastValueFrom(this.http.get<Contact[]>(this.API_URL + 'contacts'));
  }

  // getContact(id: string): Observable<Contact> {
  //   return this.http.get<Contact>(this.API_URL + id);
  // }

  // createContact(contact: Contact): Observable<Contact> {
  //   return this.http.post<Contact>(this.API_URL, contact);
  // }

  // updateContact(id: string, contact: Contact): Observable<Contact> {
  //   return this.http.put<Contact>(this.API_URL + id, contact);
  // }

  // deleteContact(id: string): Observable<void> {
  //   return this.http.delete<void>(this.API_URL + id);
  // }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
