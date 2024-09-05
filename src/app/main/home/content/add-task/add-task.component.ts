import { Component } from '@angular/core';
import { InputFieldComponent } from "../../../utility/input-field/input-field.component";
import {TranslateModule} from "@ngx-translate/core";
import {TasksService} from "../../../../services/tasks/tasks.service";
import { Task } from '../../../../interfaces/task.interface';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    InputFieldComponent,
    TranslateModule
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  public tasks: Task[] = [];
  private tasksSubscription: Subscription = new Subscription();

  constructor(private tasksService: TasksService) { }

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
