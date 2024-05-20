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

  public async ngOnInit() {
    this.showContactList();
  }

  showContactList() {
    this.contacts = [];
    this.contactsService.getAllContacts().subscribe(data => {
        console.log(data);
        this.contacts = data;
      });
  }
}
