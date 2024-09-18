import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./main/home/home-routing.routes').then(m => m.HOME_ROUTES)
  }
];
