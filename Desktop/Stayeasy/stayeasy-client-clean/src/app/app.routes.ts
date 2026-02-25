import { Routes } from '@angular/router';
import { RoomsComponent } from './pages/rooms/rooms';

export const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent }
];