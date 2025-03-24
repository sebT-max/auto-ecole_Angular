import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/pages/home/home.component';
import {isConnectedGuard} from './features/auth/guards/is-connected.guard';

export const routes: Routes = [
  {
    path:'',
    loadComponent:()=>
      import('./features/home/pages/home/home.component').then
      ((c) => c.HomeComponent,
        ),
  },
  {
    path: 'auth/me',
    canActivate: [isConnectedGuard],
    loadComponent: () =>
      import('./features/auth/pages/me-detail/me-detail.component').then(
        (c) => c.MeDetailComponent,
      ),
  },
  {
    path: 'auth/:id',
    canActivate: [isConnectedGuard],
    loadComponent: () =>
      import('./features/auth/pages/user-detail/user-detail.component').then(
        (c) => c.UserDetailComponent,
      ),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(
        (c) => c.LoginComponent,
      ),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
  },
  {
    path: 'stages/all',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
  },
];
