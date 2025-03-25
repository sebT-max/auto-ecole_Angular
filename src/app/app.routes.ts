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
    path: 'stages-infos',
    loadComponent:()=>
    import('./features/stage/pages/infos-stages/infos-stage.component').then
((c) => c.InfosStageComponent,
),
  },
  /*
  {
    path:'b2b',
  },

  {
    path: 'qui-sommes-nous ?',

  },
  {
    path: 'statistiques-et-législation',

  },

   */
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
    path: 'auth/user/register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
  },
  {
    path: 'auth/company/register',
    loadComponent: () =>
      import('./features/auth/pages/company-register/company-register.component').then(
        (c) => c.CompanyRegisterComponent,
      ),
  },
  {
    path: 'stages/all',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
  }
];
