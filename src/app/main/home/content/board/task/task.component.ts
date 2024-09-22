import {Component, Input} from '@angular/core';
import {Task} from "../../../../../interfaces/task.interface";
import {Contact} from "../../../../../interfaces/contact.interface";
import {ContactsService} from "../../../../../services/contacts/contacts.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() task?: Task;
  public contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) {
  }

  async ngOnInit() {
    console.log(this.task);
    await this.getContacts();
  }

  public async getContacts() {
    if (this.task?.contacts) {
        for (let contactId of this.task.contacts) {
            await this.contactsService.getContact(contactId).then((contact: Contact) => {
            this.contacts.push(contact);
            });
        }
      console.log(this.contacts);
      // this.sortContacts();
    }
  }

  private sortContacts() {
    this.contacts?.sort((a, b) => {
      return (a.lastName ?? '').localeCompare(b.lastName ?? '');
    });
  }

}
