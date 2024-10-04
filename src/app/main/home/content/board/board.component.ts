import { Component, OnDestroy, OnInit } from "@angular/core";
import { Task } from "../../../../interfaces/task.interface";
import { Subscription } from "rxjs";
import { TasksService } from "../../../../services/tasks/tasks.service";
import { SubheadlineComponent } from "../../../utility/subheadline/subheadline.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ButtonComponent } from "../../../utility/button/button.component";
import { TaskComponent } from "./task/task.component";
import { AddTaskDialogComponent } from "../add-task/add-task-dialog/add-task-dialog.component";
import { ContactsService } from "../../../../services/contacts/contacts.service";
import { NgOptimizedImage } from "@angular/common";
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem, CdkDropListGroup } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-board",
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
    NgOptimizedImage,
    DragDropModule
  ],
  templateUrl: "./board.component.html",
  styleUrl: "./board.component.scss",
})
export class BoardComponent implements OnInit, OnDestroy {
  public tasks: Task[] = [];
  private tasksSubscription: Subscription = new Subscription();
  private pollingInterval: any;
  public showAddTask: boolean = false;

  // public headlines: string[] = ["Todo", "Progress", "Feedback", "Done"];
  public done: Task[] = [];
  public feedback: Task[] = [];
  public progress: Task[] = [];
  public todo: Task[] = [];

  constructor(
    private tasksService: TasksService,
    private contactsService: ContactsService
  ) {}

  public async ngOnInit() {
    await this.loadTasks(); // Load tasks from Backend
    this.categorizeTasks(); // Categorize tasks into different arrays
    this.checkArrays(); // Debugging
    this.startPolling(); // Start polling the Board intervals from Backend
  }

  public ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
    this.stopPolling();
  }


  private async loadTasks() {
    try {
      await this.tasksService.getAllTasks();
      this.tasksService.tasks$.subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    } catch (error) {
      console.error('Error at loading Tasks:', error);
    }
  } 


  private categorizeTasks() {
    this.todo = [];
    this.progress = [];
    this.feedback = [];
    this.done = [];
    this.tasks.forEach((task: Task) => {
      switch (task.posStatus) {
        case 0:
          this.todo.push(task);
          break;
        case 1:
          this.progress.push(task);
          break;
        case 2:
          this.feedback.push(task);
          break;
        case 3:
          this.done.push(task);
          break;
      }
    });
  }

  /********** Drag n Drop Section ***************/
  public drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      // Reorder items within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move items between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.checkArrays();
  }


  /********** Polling Section ***************/
  private startPolling(interval: number = 5000): void {
    this.pollingInterval = setInterval(async () => {
      await this.tasksService.getAllTasks();
    }, interval);
  }


  private stopPolling(): void {
    clearInterval(this.pollingInterval);
  }







  private checkArrays() {
    console.log('todo', this.todo);
    console.log('done', this.done);
    console.log('progress', this.progress);
    console.log('feedback', this.feedback);
  }

    // public filterHeadlines(head: string) {
  //     return this.headlines.filter(h => h !== head);
  // }

    // public trackByTaskId(index: number, task: Task) {
  //   console.log(index);
  //   console.log(task._id);
  //   return task._id;
  // }
}
