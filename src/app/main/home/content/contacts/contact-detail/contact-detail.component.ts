import { Contact, Address } from './../../../../../interfaces/contact.interface';
import { Component, Output } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ContactsService } from "../../../../../services/contacts/contacts.service";
import { NgStyle } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { ContactEditCardComponent } from "../contact-edit-card/contact-edit-card.component";


@Component({

  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    NgStyle,
    TranslateModule,
    ContactEditCardComponent
  ],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})

export class ContactDetailComponent {
  public contactData: Contact = {} as Contact;
  public contactId: string = '';

  @Output() public contact: Contact = {} as Contact;

  constructor(private route: ActivatedRoute, private contactsService: ContactsService, private router: Router) {
    this.route.params.subscribe(params => {
      this.contactId = params['id'];
      this.getContact();
    });
  }

  public async getContact() {
    this.contactsService.getContact(this.contactId).subscribe((data: any) => {
      this.contactData = data.contact as Contact;
    });
    console.log(this.contactData);
    console.log(this.contactId);
    
  }

  public async deleteContact(id: string) {
    this.contactsService.deleteContact(id).subscribe((data: any) => { 
      console.log(data); //TODO Notification BADGE!!!
      this.router.navigate(['/contacts']);
    });
  }
}
