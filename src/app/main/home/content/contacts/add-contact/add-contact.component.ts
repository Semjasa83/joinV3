import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { ContactsService } from '../../../../../services/contacts/contacts.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ButtonComponent } from '../../../../utility/button/button.component';
import { lastValueFrom } from "rxjs";
import { Address, Contact, ContactImpl, AddressImpl } from "../../../../../interfaces/contact.interface";

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

    let newContact: Contact = new ContactImpl();
      newContact = {
        ...newContact,
        ...this.addContactForm.value,
        address: new AddressImpl(),
        color: this.randomColorPicker(),
      }
    
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
