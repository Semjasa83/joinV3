import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-edit-card',
  standalone: true,
  imports: [
    TranslateModule,
    NgStyle
  ],
  templateUrl: './contact-edit-card.component.html',
  styleUrl: './contact-edit-card.component.scss'
})
export class ContactEditCardComponent {

}
