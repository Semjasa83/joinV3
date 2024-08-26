import { Component } from '@angular/core';
import { InputFieldComponent } from "../../../utility/input-field/input-field.component";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    InputFieldComponent
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

}
