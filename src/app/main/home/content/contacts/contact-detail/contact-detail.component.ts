import { Contact } from './../../../../../interfaces/contact.interface';
import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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

  constructor(private route: ActivatedRoute, private contactsService: ContactsService) {
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
  }
}
