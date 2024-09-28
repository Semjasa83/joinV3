import {ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {Task} from "../../../../../interfaces/task.interface";
import {Contact} from "../../../../../interfaces/contact.interface";
import {ContactsService} from "../../../../../services/contacts/contacts.service";
import {AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {firstValueFrom} from 'rxjs';
import {TranslateModule} from "@ngx-translate/core";

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        JsonPipe,
        AsyncPipe,
        NgClass,
        NgStyle,
        TranslateModule
    ],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {

    @Input() task?: Task;
    @Input() contacts: Contact[] = [];
    public contactList: Contact[] = [];

    constructor(private contactsService: ContactsService, private cdr: ChangeDetectorRef) {
    }

    public async ngOnInit() {
        await this.loadContactList();
    }

    private async loadContactList() {
        if (this.task?.contacts) {
            try {
                const contactPromises = this.task.contacts.map(contactId => firstValueFrom(this.contactsService.getSpecContact(contactId)));
                const contacts = await Promise.all(contactPromises);
                this.contactList = contacts
                    .filter(e => e?.contact !== null)
                    .map(e => e.contact as Contact);
                this.cdr.detectChanges();
            } catch (error) {
                console.error('Error loading contacts:', error);
            }
        }
    }
}


