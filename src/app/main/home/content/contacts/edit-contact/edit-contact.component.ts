import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactsService } from '../../../../../services/contacts/contacts.service';
import { Address, AddressImpl, Contact, ContactImpl } from '../../../../../interfaces/contact.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../utility/button/button.component';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent {

  @Output() closeDialogEvent = new EventEmitter<void>();
  public contactId: string = '';

  addContactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl(null as number | null),
    email: new FormControl('', [Validators.required, Validators.email]),

    street: new FormControl(''),
    city: new FormControl(''),
    streetNumber: new FormControl(null as number | null),
    zip: new FormControl(null as number | null),
  });

  constructor(private contactService: ContactsService) { }

  async ngOnInit() {
    this.contactService.getContactId().subscribe(id => {
      this.contactId = id;
      console.log(this.contactId)
      this.loadContactData(this.contactId);
    });

  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public closeDialog(): void {
    this.closeDialogEvent.emit();
  }

  private loadContactData(contactId: string): void {
    this.contactService.getContact(this.contactId).then((data: any) => {
      const contact: Address = data['address'];
      this.addContactForm.patchValue({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        email: contact.email,
        street: contact.address?.street,
        city: contact.address?.city,
        streetNumber: contact.address?.streetNumber,
        zip: contact.address?.zip
      });
    });

  }

  public saveEditContact() {

  }

}
