import { Component } from '@angular/core';
import {SubheadlineComponent} from "../../../utility/subheadline/subheadline.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SubheadlineComponent,
    TranslateModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
