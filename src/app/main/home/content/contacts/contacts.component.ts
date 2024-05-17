import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../../services/api/api.service";
import { Observable } from "rxjs";


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit{

  private message$: Observable<any> | undefined;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {

  };


}
