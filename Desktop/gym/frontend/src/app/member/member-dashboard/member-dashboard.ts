import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './member-dashboard.html',
  styleUrl: './member-dashboard.scss',
})
export class MemberDashboard {
  constructor(public auth: Auth) {}

  logout() {
    this.auth.logout();
  }
}
