import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactsService } from '../../../../../services/contacts/contacts.service';
import { AddressImpl, Contact, ContactImpl } from '../../../../../interfaces/contact.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../utility/button/button.component';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent {

  @Output() closeDialogEvent = new EventEmitter<void>();

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
      await this.contactService.addContact(newContact);
      this.addContactForm.reset(this.addContactForm.value);
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
