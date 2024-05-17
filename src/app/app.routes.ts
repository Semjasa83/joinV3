import { Routes } from '@angular/router';
import { HomeComponent } from "./main/home/home.component";
import { DashboardComponent } from './main/home/content/dashboard/dashboard.component';
import { ContactsComponent } from './main/home/content/contacts/contacts.component';
import { AddTaskComponent } from './main/home/content/add-task/add-task.component';
import { BoardComponent } from './main/home/content/board/board.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { name: 'Dashboard', icon: 'space_dashboard' } },
      { path: 'addtask', component: AddTaskComponent, data: { name: 'Add Task', icon: 'edit_square' } },
      { path: 'board', component: BoardComponent, data: { name: 'Board', icon: 'calendar_view_week' } },
      { path: 'contacts', component: ContactsComponent, data: { name: 'Contacts', icon: 'perm_contact_calendar' } },
      // { path: '**', component: DashboardComponent },
    ],
  },

];
