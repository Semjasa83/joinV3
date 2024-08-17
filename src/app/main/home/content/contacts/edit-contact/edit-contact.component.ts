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
  public contactData: Address = new AddressImpl();

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
      street: contact.street || '',
      city: contact.city || '',
      streetNumber: contact.streetNumber || null,
      zip: contact.zip || null,
      country: contact.country || null,
    });
  }


  public async saveEditContact() {
    console.log(this.addContactForm.value);
  }
};




