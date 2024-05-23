import { Component, OnInit,  } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { routes } from '../../../app.routes';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    imports: [
        RouterLink,
        RouterLinkActive,
        NgFor,
        NgIf
    ]
})
export class SidenavComponent implements OnInit{

    public routesData: any[] = [];

    constructor(public router: Router) { 
    }

    public ngOnInit(): void {
        if (routes[1].children) {
            this.routesData = routes[1].children;
            console.log(routes[1].children);
            
        }
    }
}
