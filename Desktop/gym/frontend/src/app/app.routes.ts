import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';
import { MemberGuard } from './guards/member-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then((m) => m.Login),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register').then((m) => m.Register),
  },

  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadComponent: () =>
      import('./admin/admin-dashboard/admin-dashboard')
        .then((m) => m.AdminDashboard),
  },

  {
    path: 'member',
    canActivate: [AuthGuard, MemberGuard],
    loadComponent: () =>
      import('./member/member-dashboard/member-dashboard')
        .then((m) => m.MemberDashboard),
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];