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

  constructor(private contactsService: ContactsService) { }

  public ngOnInit() {
    console.log('ngOnInit called');
    this.contactsService.getAllContacts().then(contacts => {
        console.log(contacts);
    }).catch(error => {
        console.error(error);
    });
}
}
