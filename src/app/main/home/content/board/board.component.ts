import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from "@angular/core";
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
import { NgIf, NgTemplateOutlet} from "@angular/common";
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

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
    DragDropModule,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: "./board.component.html",
  styleUrl: "./board.component.scss",
})
export class BoardComponent implements OnInit, OnDestroy {
  public tasks: Task[] = [];
  private tasksSubscription: Subscription = new Subscription();
  private pollingInterval: any;
  public showAddTask: boolean = false;

  // @HostListener('window:resize', ['$event'])
  public done: Task[] = [];
  public feedback: Task[] = [];
  public progress: Task[] = [];
  public todo: Task[] = [];

  constructor(
    private tasksService: TasksService,
    private contactsService: ContactsService,
    private cd: ChangeDetectorRef
  ) {}

  public async ngOnInit() {
    await this.loadTasks();
    this.categorizeTasks();
    // this.startPolling(); // Start polling the Board intervals from Backend
  }

  public ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
    // this.stopPolling();
  }


  private async loadTasks(): Promise<void> {
    try {
      await this.tasksService.getAllTasks();
      this.tasksService.tasks$.subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    } catch (error) {
      console.error('Error at loading Tasks:', error);
    }
  } 

  private categorizeTasks(): void {
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
  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      // Reorder items within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move items between lists
      console.log('previousContainer', event.previousContainer.data);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      const newPosition = this.getNewPosition(event.container.id);
      this.updateTaskPosition(task, newPosition);
    }
  }

  private updateTaskPosition(task: Task, newPosition: number): void {
    task.posStatus = newPosition;
    if (task._id) {
      this.tasksService.updateTask(task._id, task);
    }
  }

  private getNewPosition(containerId: string): number {
    switch (containerId) {
      case 'cdk-drop-list-0':
        return 0;
      case 'cdk-drop-list-1':
        return 1;
      case 'cdk-drop-list-2':
        return 2;
      case 'cdk-drop-list-3':
        return 3;
      default:
        return 0;
    }
  }

  public trackByTaskId(index: number, task: Task) {
    return task._id;
  }

  /********** Polling Section ***************/
  // private startPolling(interval: number = 5000): void {
  //   this.pollingInterval = setInterval(async () => {
  //     await this.tasksService.getAllTasks();
  //   }, interval);
  // }


  // private stopPolling(): void {
  //   clearInterval(this.pollingInterval);
  // }

  // public onResize(event: Event) {
  //   this.handleResize();
  //   console.log(event);
    
  // }

  // private handleResize() {
  //   this.cd.detectChanges();
  // }

}