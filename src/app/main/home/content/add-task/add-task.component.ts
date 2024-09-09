import {Component} from '@angular/core';
import {InputFieldComponent} from "../../../utility/input-field/input-field.component";
import {TranslateModule} from "@ngx-translate/core";
import {TasksService} from "../../../../services/tasks/tasks.service";
import {Task} from '../../../../interfaces/task.interface';
import {Subscription} from "rxjs";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

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
        MatDatepicker
    ],
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

    public tasks: Task[] = [];
    private tasksSubscription: Subscription = new Subscription();

    constructor(private tasksService: TasksService) {
    }

    // async ngOnInit() {
    //   await this.tasksService.getAllTasks();
    //   this.tasksService.tasks$.subscribe((tasks: Task[]) => {
    //     this.tasks = tasks;
    //   }).unsubscribe();
    //   this.tasksService.startPolling();
    // }
    //
    // ngOnDestroy() {
    //   if (this.tasksSubscription) {
    //     this.tasksSubscription.unsubscribe();
    //   }
    //   this.tasksService.stopPolling();
    // }

}
