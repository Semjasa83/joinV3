import { NgClass, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() text?: string;
  @Input() icon?: string;
  @Input() bgrColor?: string;
  @Input() txtColor?: string;
  @Output() buttonClick: EventEmitter<void> | undefined;

  onClick() {
    if (this.buttonClick) {
      this.buttonClick.emit();
    }
  }
}
