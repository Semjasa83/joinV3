import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private API_URL = 'http://localhost:3000/api/';

  httpOptions = { 
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient, private httpClientModule: HttpClientModule) { }


  // getAllContacts(): Observable<Contact[]> {
    async getAllContacts(): Promise<void> {
    await console.log(this.API_URL + 'contacts');
    
    //return this.httpClient.get<Contact[]>(this.API_URL + 'contacts').pipe(catchError(this.errorHandler));
  }
  // getContacts(): Observable<Contact[]> {
  //   return this.http.get<Contact[]>(this.API_URL);
  // }

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
