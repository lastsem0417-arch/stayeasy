import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule   // ✅ required for routerLink
  ],
  templateUrl: './register.html'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe(() => {
      alert('Registered successfully');
      this.router.navigate(['/login']);
    });
  }
}