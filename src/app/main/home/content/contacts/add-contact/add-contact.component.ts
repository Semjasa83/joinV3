import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})

export class AddContactComponent {

  @Output() closeDialogEvent = new EventEmitter<void>();

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public closeDialog(): void {
    this.closeDialogEvent.emit();
  }
}
