import {Component, Input} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-subheadline',
  standalone: true,
  imports: [
    TranslateModule,
    NgIf,
    NgClass
  ],
  templateUrl: './subheadline.component.html',
  styleUrl: './subheadline.component.scss'
})
export class SubheadlineComponent {
  @Input() text: string = '';
  @Input() subtext?: string;
  @Input() line?: boolean = false;
}
