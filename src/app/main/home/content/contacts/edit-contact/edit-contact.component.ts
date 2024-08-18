import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactsService } from '../../../../../services/contacts/contacts.service';
import { Address, AddressImpl, Contact, ContactImpl } from '../../../../../interfaces/contact.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../utility/button/button.component';
import { ActivatedRoute } from '@angular/router';

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
  public contactData: Contact = new ContactImpl();

  addContactForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(null as number | null),
    email: new FormControl('', Validators.email),
    street: new FormControl(''),
    city: new FormControl(''),
    streetNumber: new FormControl(''),
    zip: new FormControl(null as number | null),
    country: new FormControl(''),
    color: new FormControl(''),
    _id: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private contactService: ContactsService) { }

  public async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: string = String(params.get('id'));
      if (id !== undefined) { this.contactId = id; }
      this.loadContactData(this.contactId);
    });
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public closeDialog(): void {
    this.closeDialogEvent.emit();
  }

  public async loadContactData(id: string) {
    const response: any = await this.contactService.getContact(this.contactId);
    const contact: Address = response.contact
    this.contactData = contact;
    this.addContactForm.patchValue({
      firstName: contact.firstName || '',
      lastName: contact.lastName || '',
      phone: contact.phone || null,
      email: contact.email || '',
      street: contact.address.street || '',
      city: contact.address.city || '',
      streetNumber: contact.address.streetNumber || null,
      zip: contact.address.zip || null,
      country: contact.address.country || null,
    });
  }


  public async saveEditContact() {
    const formValue: any = this.addContactForm.value;
    const updatedContact: Address = {
      firstName: formValue.firstName || '',
      lastName: formValue.lastName || '',
      phone: formValue.phone || null,
      email: formValue.email || '',
      address: { 
        street: formValue.address?.street || '',
        city: formValue.address?.city || '',
        streetNumber: formValue.address?.streetNumber || '',
        zip: formValue.address?.zip || null,
        country: formValue.address?.country || '',
      },
      color: this.contactData.color,
      _id: this.contactId
    }
    console.log(updatedContact);
    // await this.contactService.updateContact(this.contactId, updatedContact)
  }
}




