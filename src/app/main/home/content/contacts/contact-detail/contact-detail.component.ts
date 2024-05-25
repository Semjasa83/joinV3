import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContactsService} from "../../../../../services/contacts/contacts.service";
import {Contact} from "../../../../../interfaces/contact";
import {NgStyle} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";

interface ContactResponse {
  contact: Contact;
};
@Component({

  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    NgStyle,
    TranslateModule
  ],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})

export class ContactDetailComponent {
  public contactData: Contact = new Contact();

constructor(private route: ActivatedRoute, private contactsService: ContactsService) {
}

  ngOnInit() {

    this.getContact();
  }

  public async getContact() {
    this.route.params.subscribe(params => {
      this.contactsService.getContact(params['id']).subscribe((data: any) => {

        this.contactData = data.contact;
      });
    });
       }
}
