import { Component } from '@angular/core';
import { ContactsService } from '../../../../services/contacts.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ 

  ],
  providers: [
    ContactsService
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContacts().subscribe(contacts => {
      console.log(contacts);
    });
  }
}
