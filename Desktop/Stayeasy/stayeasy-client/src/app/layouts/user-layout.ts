import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-layout',
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './user-layout.html'
})
export class UserLayoutComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}