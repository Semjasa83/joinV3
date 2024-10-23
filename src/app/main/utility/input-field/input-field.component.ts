import { NgClass, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent {

  @Input() inputType?: string = 'text';
  @Input() placeholder?: string = '';
  @Input() value?: string = '';
  @Input() label?: string;
  @Input() icon?: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onValueChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }

}
