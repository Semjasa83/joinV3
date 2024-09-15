import { Component } from '@angular/core';
import {Task} from "../../../../interfaces/task.interface";
import {Subscription} from "rxjs";
import {TasksService} from "../../../../services/tasks/tasks.service";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  // public tasks: Task[] = [];
  // private tasksSubscription: Subscription = new Subscription();

  constructor(private tasksService: TasksService) {}

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
