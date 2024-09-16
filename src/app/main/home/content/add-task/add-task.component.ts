import {Component} from '@angular/core';
import {InputFieldComponent} from "../../../utility/input-field/input-field.component";
import {TranslateModule} from "@ngx-translate/core";
import {TasksService} from "../../../../services/tasks/tasks.service";
import {Task, TaskImpl} from '../../../../interfaces/task.interface';
import {Subscription} from "rxjs";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {ButtonComponent} from "../../../utility/button/button.component";
import {SubheadlineComponent} from "../../../utility/subheadline/subheadline.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
    ],
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

    public categories: string[] = ['UX/UI', 'Backlog', 'Frontend', 'Backend'];
    public priorities: string = '';

    addTaskForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(4)]),
        description: new FormControl(''),
        dueDate: new FormControl(new Date, [Validators.required]),
        priority: new FormControl(''),
        category: new FormControl('', [Validators.required]),
        contacts: new FormControl([])
    });

    constructor(private tasksService: TasksService) {
    }

    public async addTask() {
        let newTask: Task = new TaskImpl();
        newTask = {
            ...newTask,
            ...this.addTaskForm.value,
            priority: this.priorities
        }
        try {
            console.log('newTask:', newTask);
            // await this.tasksService.addTask(newTask);
            // this.addTaskForm.reset(this.addTaskForm.value);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    public setPriority(priority: 'low' | 'medium' | 'urgent') {
        this.priorities = priority;
    }

}
