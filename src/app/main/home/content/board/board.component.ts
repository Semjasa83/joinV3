import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../../../interfaces/task.interface";
import {Subscription} from "rxjs";
import {TasksService} from "../../../../services/tasks/tasks.service";
import {SubheadlineComponent} from "../../../utility/subheadline/subheadline.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
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
import { ContactsService } from '../../../../services/contacts/contacts.service';

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
export class BoardComponent implements OnInit, OnDestroy {

  public tasks: Task[] = [];
  private tasksSubscription: Subscription = new Subscription();
  private pollingInterval: any;
  public showAddTask: boolean = false;

  public done: Task[] = [];
  public feedback: Task[] = [];
  public progress: Task[] = [];
  public todo: Task[] = [];

  constructor(private tasksService: TasksService, private contactsService: ContactsService) {}

  public async ngOnInit() {
    await this.tasksService.getAllTasks();
    this.tasksService.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
    this.startPolling();
  }

  public ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
    this.stopPolling();
  }

  // private loadTasks() {
  //   this.tasks.forEach((task: Task) => {
  //     switch (task.status) {
  //       case 'done':
  //         this.done.push(task);
  //         break;
  //       case 'feedback':
  //         this.feedback.push(task);
  //         break;
  //       case 'progress':
  //         this.progress.push(task);
  //         break;
  //       case 'todo':
  //         this.todo.push(task);
  //         break;
  //     }
  //   });
  // }

  /**
   * Refresh tasks every interval
   * @param interval Polling interval in milliseconds
   */
  private startPolling(interval: number = 5000): void {
    this.pollingInterval = setInterval(async () => {
      await this.tasksService.getAllTasks();
    }, interval);
  }

  /**
   * Stop polling
   */
  private stopPolling(): void {
    clearInterval(this.pollingInterval);
  }

  /**
   * For CDK Drag and Drop from Angular Material
   * @param event Drag and drop event
   */
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
