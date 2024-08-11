import { Contact, Address } from './../../../../../interfaces/contact.interface';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ContactsService } from "../../../../../services/contacts/contacts.service";
import { NgIf, NgStyle } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { ContactEditCardComponent } from "../contact-edit-card/contact-edit-card.component";
import { firstValueFrom } from 'rxjs';


@Component({

  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    NgStyle,
    TranslateModule,
    ContactEditCardComponent,
    NgIf
  ],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})

export class ContactDetailComponent {
  public contactData: Contact = {} as Contact;
  public contactId: string = '';

  @Output() public contact: Contact = {} as Contact;
  @Output() public refreshAfterDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private contactsService: ContactsService, private router: Router) {
    this.route.params.subscribe(params => {
      this.contactId = params['id'];
      this.getContact();
    });
  }

  public async getContact() {
    try {
      const data: any = await this.contactsService.getContact(this.contactId);
      this.contactData = data.contact as Contact;
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteContact(id: string) {
    try {
      const response = await this.contactsService.deleteContact(id);
      console.log(response); //TODO Notification BADGE!!!
      this.router.navigate(['/home/contacts']).then(() => {window.location.reload()});
    } catch (error) {
      console.error(error);
    }
  }

}
