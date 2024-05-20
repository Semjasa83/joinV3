import { Component } from '@angular/core';
import { ContactsService } from '../../../../services/contacts.service';
import { Contact } from "../../../../interfaces/contact";
import { ButtonComponent } from '../../../utility/button/button.component';
import { TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent
  ],
  providers: [
    ContactsService,

  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})

export class ContactsComponent {


  public contacts: Contact[] = [];

  constructor(public contactsService: ContactsService) { }

  public ngOnInit() {
    this.getContactList();

  }

  public async getContactList() {
    this.contacts = [];
    this.contactsService.getAllContacts().subscribe(data => {
        console.log(data);
        // this.contacts = data;
        this.sortedContacts(data);
      });
  }

  public async sortedContacts(data: any) {
    const arr = Object.keys(data);
    let key = arr[0];
    this.contacts = data[key];
    this.contacts?.sort((a, b) => { 
      return a.lastName.localeCompare(b.lastName);
    });
    console.log(this.contacts);
  };


}
