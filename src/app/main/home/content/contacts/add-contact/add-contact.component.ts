import {Component, EventEmitter, Output} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {ButtonComponent} from "../../../../utility/button/button.component";

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent
  ],
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
