import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { ContactsService } from '../../../../../services/contacts/contacts.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ButtonComponent } from '../../../../utility/button/button.component';
// import { Contact } from '../../../../../interfaces/contact';
import {lastValueFrom} from "rxjs";
import {Contact} from "../../../../../interfaces/contact.interface";

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})


export class AddContactComponent {

  @Output() closeDialogEvent = new EventEmitter<void>();
  @Output() refreshContacts = new EventEmitter<void>();

  addContactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl( null ),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private contactService: ContactsService) { }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public closeDialog(): void {
    this.closeDialogEvent.emit();
  }

  public async addContact() {
    const newContact: Contact = {
      firstName: this.addContactForm.get('firstName')!.value,
      lastName: this.addContactForm.get('lastName')!.value,
      email: this.addContactForm.get('email')!.value,
      phone: this.addContactForm.get('phone')!.value,
      address: {
        street: '',
        streetNumber: null,
        city: '',
        zip: null,
        country: ''
      },
      color: this.randomColorPicker(),
    };
    try {
      await lastValueFrom(this.contactService.addContact(newContact));
      this.addContactForm.reset(this.addContactForm.value);
      this.refreshContacts.emit();
      this.closeDialog();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  }

  private randomColorPicker() {
    let varColor = Math.floor(Math.random() * 359);
    return `hsl(${varColor}, 75%, 75%)`;
  }
}
