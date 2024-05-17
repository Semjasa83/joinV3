import { Component } from '@angular/core';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ 

  ],
  providers: [
    ContactsService,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})

export class ContactsComponent {

  constructor(public contactsService: ContactsService) { }

  public async ngOnInit() {

    let contacts = await this.contactsService.getContacts();
    console.log(contacts);
    
}
}
