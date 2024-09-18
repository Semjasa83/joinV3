import {Component} from '@angular/core';
import {InputFieldComponent} from "../../../utility/input-field/input-field.component";
import {TranslateModule} from "@ngx-translate/core";
import {TasksService} from "../../../../services/tasks/tasks.service";
import {Task, TaskImpl} from '../../../../interfaces/task.interface';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect, MatSelectTrigger} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {ButtonComponent} from "../../../utility/button/button.component";
import {SubheadlineComponent} from "../../../utility/subheadline/subheadline.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {ContactsService} from "../../../../services/contacts/contacts.service";
import {Contact} from "../../../../interfaces/contact.interface";

@Component({
    selector: 'app-add-task',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [
        InputFieldComponent,
        TranslateModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelect,
        MatOption,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        ButtonComponent,
        SubheadlineComponent,
        ReactiveFormsModule,
        MatSelectTrigger,
    ],
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

    public categories: string[] = ['UX/UI', 'Backlog', 'Frontend', 'Backend'];
    public priorities: string = '';
    public contactList: Contact[] = [];

    addTaskForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(4)]),
        description: new FormControl(''),
        dueDate: new FormControl(new Date, [Validators.required]),
        priority: new FormControl(''),
        category: new FormControl('', [Validators.required]),
        contacts: new FormControl([])
    });

    constructor(private tasksService: TasksService, private contactsService: ContactsService) {}

    public async ngOnInit() {
        await this.contactsService.getAllContacts();
        this.contactsService.contacts$.subscribe((response: Contact[]) => {
            this.contactList = response;
        })
        this.sortContacts();
    }

    public setPriority(priority: '' | 'low' | 'medium' | 'urgent') {
        this.priorities = priority;
    }

    private sortContacts() {
        this.contactList?.sort((a, b) => {
            return (a.lastName ?? '').localeCompare(b.lastName ?? '');
        });
    }

    public async addTask() {
        const contactArr: string[] = this.addTaskForm?.value?.contacts || [];
        let newTask: Task = new TaskImpl();
        newTask = {
            ...newTask,
            ...this.addTaskForm.value,
            priority: this.priorities,
            contacts: contactArr,
            _id: null
        }
        try {
            console.log('newTask:', newTask);
            await this.tasksService.addTask(newTask);
            this.addTaskForm.reset();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    public clearForm() {
        this.setPriority('');
        this.addTaskForm.reset();
    }



}
