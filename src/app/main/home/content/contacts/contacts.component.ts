import { Component } from '@angular/core';
import { ContactsService } from '../../../../services/contacts/contacts.service';
import { Contact } from "../../../../interfaces/contact";
import { ButtonComponent } from '../../../utility/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor, NgStyle} from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgStyle,
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
  public groupLetters: string[] = [];
  public groupedContactsArray: Contact[] = [];
  public groupArray: any[] = [];

  constructor(public contactsService: ContactsService) { }

  public ngOnInit() {
    this.getContactList();
  };

  public ngOnAfterContentInit() {

  }

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
    await this.getGroupedContacts();
  };

  public async getGroupedContacts(): Promise<void> {
    this.groupContacts = {};
    this.contacts.forEach((contact) => {
      const letter = contact.lastName.charAt(0).toUpperCase();
      if (!this.groupContacts[letter]) {
        this.groupContacts[letter] = [];
      }
      this.groupContacts[letter].push(contact);
    });
    await this.renderGroupedContacts();
  };


  public async renderGroupedContacts() {
    const arr = Object.entries(this.groupContacts);
    arr.forEach((group) => {
      this.groupLetters.push(group[0]);
      for (let i = 0; i < group[1].length; i++) {
        const c = group[1][i];
        this.groupedContactsArray.push(c);
      }
      this.groupArray.push(this.groupedContactsArray);
      this.groupedContactsArray = [];
    }
    );
  }

  public openContactDetails(contact: Contact) {
    console.log(contact);

  }




  //auslagern create contact!!!!
  public randomColorPicker() {
    let varColor = Math.floor(Math.random() * 359);
    return `hsl(${varColor}, 75%, 75%)`;
  }
}
