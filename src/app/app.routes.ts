import { Routes } from '@angular/router';
import { HomeComponent } from "./main/home/home.component";
import { DashboardComponent } from './main/home/content/dashboard/dashboard.component';
import { ContactsComponent } from './main/home/content/contacts/contacts.component';
import { AddTaskComponent } from './main/home/content/add-task/add-task.component';
import { BoardComponent } from './main/home/content/board/board.component';
// import { ContactDetailComponent } from './main/home/content/contacts/contact-detail/contact-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { name: 'Dashboard', icon: 'space_dashboard.svg' } },
      { path: 'addtask', component: AddTaskComponent, data: { name: 'Add Task', icon: 'edit_square.svg' } },
      { path: 'board', component: BoardComponent, data: { name: 'Board', icon: 'calendar_view_week.svg' } },
      { path: 'contacts', component: ContactsComponent, data: { name: 'Contacts', icon: 'perm_contact_calendar.svg'},
          // children: [
          //   { path: ':id', component: ContactDetailComponent }
          //   ]
        },
      // { path: '**', component: DashboardComponent },
    ],
  },

];
