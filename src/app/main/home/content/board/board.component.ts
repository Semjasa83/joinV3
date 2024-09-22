import { Component } from '@angular/core';
import {Task} from "../../../../interfaces/task.interface";
import {Subscription} from "rxjs";
import {TasksService} from "../../../../services/tasks/tasks.service";
import {SubheadlineComponent} from "../../../utility/subheadline/subheadline.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {ButtonComponent} from "../../../utility/button/button.component";
import {TaskComponent} from "./task/task.component";
import { AddTaskDialogComponent } from '../add-task/add-task-dialog/add-task-dialog.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    SubheadlineComponent,
    TranslateModule,
    MatFormFieldModule,
    MatIcon,
    MatInput,
    ButtonComponent,
    TaskComponent,
    AddTaskDialogComponent,
    CdkDrag,
    CdkDropListGroup,
    CdkDropList
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  public tasks: Task[] = [];
  private tasksSubscription: Subscription = new Subscription();
  private pollingInterval: any;
  public showAddTask: boolean = false;

  public done: Task[] = [];
  public feedback: Task[] = [];
  public progress: Task[] = [];
  public todo: Task[] = [];

  constructor(private tasksService: TasksService) {}

  async ngOnInit() {
    await this.tasksService.getAllTasks();
    this.tasksService.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    }).unsubscribe();
    this.startPolling();
    console.log(this.tasks);
  }

  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
    this.stopPolling();
  }

  public startPolling(interval: number = 5000): void {
    this.pollingInterval = setInterval(async () => {
      await this.tasksService.getAllTasks();
    }, interval);
  }

  public stopPolling(): void {
    clearInterval(this.pollingInterval);
  }

  // public async testCall() {                                                                         //remember to remove this function
  //   return this.http.get<Task[]>(this.API_URL + 'tasks', { observe: 'response' }).subscribe(res => {
  //     console.log('response Status', res.status);
  //     console.log('body', res.body);
  //   });
  // }


  public drop(event: CdkDragDrop<string[]> | any) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
      );
    }
  }

  public trackByTaskId(index: number, task: Task) {
    console.log(index)
    console.log(task._id)
    return task._id;
  }
}
