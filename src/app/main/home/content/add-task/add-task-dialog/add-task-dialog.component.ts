import { Component } from '@angular/core';
import {AddTaskComponent} from "../add-task.component";

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    AddTaskComponent
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent {

}
