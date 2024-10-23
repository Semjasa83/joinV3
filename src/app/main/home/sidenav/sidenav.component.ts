import { Component, OnInit,  } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import {NgFor, NgIf, NgOptimizedImage} from '@angular/common';
import { HOME_ROUTES } from '../home-routing.routes';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgIf,
    NgOptimizedImage
  ]
})
export class SidenavComponent implements OnInit{

    public routesData: any[] = [];

    constructor(public router: Router) {
    }

    public ngOnInit(): void {
        const homeRoute = HOME_ROUTES.find(route => route.path === '');
        if (homeRoute && homeRoute.children) {
            this.routesData = homeRoute.children;
        }
    }
}
