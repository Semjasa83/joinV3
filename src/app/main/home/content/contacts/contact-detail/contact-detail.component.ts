// import { Component } from '@angular/core';
// import { ActivatedRoute } from "@angular/router";
// import { ContactsService } from "../../../../../services/contacts/contacts.service";
// import { NgStyle } from '@angular/common';
// import { TranslateModule } from "@ngx-translate/core";
// import { ContactEditCardComponent } from "../contact-edit-card/contact-edit-card.component";
// import {Contact} from "../../../../../interfaces/contact.interface";
//
// interface ContactResponse {
//   contact: Contact;
// };
// @Component({
//
//   selector: 'app-contact-detail',
//   standalone: true,
//   imports: [
//     NgStyle,
//     TranslateModule,
//     ContactEditCardComponent
//   ],
//   templateUrl: './contact-detail.component.html',
//   styleUrl: './contact-detail.component.scss'
// })
//
// export class ContactDetailComponent {
//   public contactData: Contact = new Contact();
//
//   constructor(private route: ActivatedRoute, private contactsService: ContactsService) {
//   }
//
//   ngOnInit() {
//
//     this.getContact();
//   }
//
//   public async getContact() {
//     this.route.params.subscribe(params => {
//       this.contactsService.getContact(params['id']).subscribe((data: any) => {
//         this.contactData = data.contact;
//       });
//     });
//   }
// }
