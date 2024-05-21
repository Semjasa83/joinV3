import { Component } from '@angular/core';
import { ContactsService } from '../../../../services/contacts/contacts.service';
import { Contact } from "../../../../interfaces/contact";
import { ButtonComponent } from '../../../utility/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent,
    RouterOutlet,
    NgFor,
    JsonPipe
  ],
  providers: [
    ContactsService,
    { provide: 'Object', useValue: Object }
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})

export class ContactsComponent {


  public contacts: Contact[] = [];
  public groupContacts: { [key: string]: Contact[] } = {};
  // public groupedContactsArray = Object.entries(this.groupContacts);
  public groupLetters: string[] = [];
  public groupedContactsArray: Contact[] = [];
  public groupArray: any[] = [];

  constructor(public contactsService: ContactsService) { }

  public ngOnInit() {
    this.getContactList();

  };

  public async getContactList(): Promise<void> {
    this.contacts = [];
    this.contactsService.getAllContacts().subscribe(data => {
      this.sortContacts(data);
    });
  };

  public async sortContacts(data: any): Promise<void> {
    const arr = Object.keys(data);
    const key = arr[0];
    this.contacts = data[key];
    this.contacts?.sort((a, b) => {
      return a.lastName.localeCompare(b.lastName);
    })
    //console.log(this.contacts); //_CONSOLE
    this.getGroupedContacts();
  };


  public async getGroupedContacts(): Promise<void> {
    this.groupContacts = {};
    // this.groupedContactsArray = [];
    this.contacts.forEach((contact) => {
      const letter = contact.lastName.charAt(0).toUpperCase();
      if (!this.groupContacts[letter]) {
        this.groupContacts[letter] = [];
      }
      this.groupContacts[letter].push(contact);
    });
    //console.log(this.groupContacts); //_CONSOLE
    this.test();
  };


  public async test() {
    let render = document.getElementById('contactList')
    const arr = Object.entries(this.groupContacts);
    console.log(arr);
    arr.forEach((group) => {  

      this.groupLetters.push(group[0]);
      //console.log(this.groupLetters);
      
      for (let i = 0; i < group[1].length; i++) {
        const c = group[1][i];
        this.groupedContactsArray.push(c);
      }
      this.groupArray.push(this.groupedContactsArray);
      console.log(this.groupedContactsArray);
      this.groupedContactsArray = [];
    }
    );

    console.log(this.groupArray);
    
    // if (render) {
    // render.innerHTML += /*html*/`
    // <div>{{}}</div>
    // `;
    // }
}
}