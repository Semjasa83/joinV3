import { Component } from '@angular/core';
import { SidenavComponent } from "./sidenav/sidenav.component";
import { HeaderComponent } from "./header/header.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavComponent,
    HeaderComponent,
    NgIf,
    NgClass,
    NgFor,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  public sidebarToggle: boolean = true;

  constructor() { };

  public toggleSidebar() {
    this.sidebarToggle = !this.sidebarToggle
    console.log('toggle');
    
  };
}
