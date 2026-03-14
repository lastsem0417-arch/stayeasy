import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [

  // ================= ROOT =================
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ================= AUTH =================
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then(m => m.RegisterComponent)
  },



  // ================= USER AREA =================
  {
    path: 'user',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/user-layout').then(m => m.UserLayoutComponent),

    children: [

      {
        path: '',
        redirectTo: 'rooms',
        pathMatch: 'full'
      },

      {
        path: 'rooms',
        loadComponent: () =>
          import('./pages/rooms/rooms').then(m => m.RoomsComponent)
      },

      {
        path: 'book-room/:id',
        loadComponent: () =>
          import('./pages/book-room/book-room').then(m => m.BookRoomComponent)
      },

      {
        path: 'my-bookings',
        loadComponent: () =>
          import('./pages/my-bookings/my-bookings')
            .then(m => m.MyBookingsComponent)
      }

    ]
  },



  // ================= ADMIN AREA =================
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./layouts/admin-layout')
        .then(m => m.AdminLayoutComponent),

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/admin-dashboard')
            .then(m => m.AdminDashboardComponent)
      },

      {
        path: 'add-room',
        loadComponent: () =>
          import('./pages/admin-add-room/admin-add-room')
            .then(m => m.AdminAddRoomComponent)
      },

      {
        path: 'bookings',
        loadComponent: () =>
          import('./pages/admin-bookings/admin-bookings')
            .then(m => m.AdminBookingsComponent)
      },

      {
        path: 'rooms',
        loadComponent: () =>
          import('./pages/admin-rooms/admin-rooms')
            .then(m => m.AdminRoomsComponent)
      }

    ]
  },



  // ================= FALLBACK =================
  { path: '**', redirectTo: 'login' }

];