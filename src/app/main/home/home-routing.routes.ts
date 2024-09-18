import {Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "./content/dashboard/dashboard.component";
import {AddTaskComponent} from "./content/add-task/add-task.component";
import {BoardComponent} from "./content/board/board.component";
import {ContactsComponent} from "./content/contacts/contacts.component";
import {ContactDetailComponent} from "./content/contacts/contact-detail/contact-detail.component";

export const HOME_ROUTES: Routes = [{
    path: '',
    component: HomeComponent,
    children: [
        {
            path: '', redirectTo: 'dashboard', pathMatch: 'full'
        },
        {
            path: 'dashboard',
            component: DashboardComponent,
            data: {name: 'Dashboard', icon: 'space_dashboard.svg'}
        },
        {
            path: 'addtask',
            component: AddTaskComponent,
            data: {name: 'Add Task', icon: 'edit_square.svg'}
        },
        {
            path: 'board',
            component: BoardComponent,
            data: {name: 'Board', icon: 'calendar_view_week.svg'}
        },
        {
            path: 'contacts',
            component: ContactsComponent,
            data: {name: 'Contacts', icon: 'perm_contact_calendar.svg'},
            children: [
                {path: '', redirectTo: '', pathMatch: 'full'},
                {path: ':id', component: ContactDetailComponent},
            ]
        }

    ]
}];