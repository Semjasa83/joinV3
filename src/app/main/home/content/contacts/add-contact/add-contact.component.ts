import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { ContactsService } from '../../../../../services/contacts/contacts.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ButtonComponent } from '../../../../utility/button/button.component';

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

  addContactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private contactService: ContactsService) { }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public closeDialog(): void {
    this.closeDialogEvent.emit();
  }

  public createContact() {

    let phone = this.addContactForm.get('phone')?.value;
    let completePhone = '0' + phone;
    this.addContactForm.patchValue({ phone: completePhone });

    console.log(this.addContactForm.value);
    this.addContactForm.reset(this.addContactForm.value);
  }
}
