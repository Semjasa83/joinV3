import { Address } from '../../../../../interfaces/contact.interface';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ContactsService } from "../../../../../services/contacts/contacts.service";
import { NgIf, NgStyle } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { EditContactComponent } from "../edit-contact/edit-contact.component";


@Component({

  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    NgStyle,
    TranslateModule,
    NgIf,
    EditContactComponent
],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})

export class ContactDetailComponent {
  public contactData: Address = {} as Address;
  public contactId: string = '';
  public openEditContact: boolean = false;

  @Output() public contact: Address = {} as Address;
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
      this.contactData = data.contact as Address;
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

  public async editContact() {
    this.contactsService.setContactId(this.contactId);
    this.openEditContact = true;
  }

}
