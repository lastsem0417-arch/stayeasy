import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  loading = false;
  errorMsg = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    this.errorMsg = '';
    this.loading = true;

    this.http.post<any>('http://localhost:5000/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        console.log('LOGIN RESPONSE 👉', res);

        // ✅ SAFE CHECK
        if (!res?.token || !res?.user?._id || !res?.user?.role) {
          this.errorMsg = 'Invalid login response';
          this.loading = false;
          return;
        }

        // ✅ SAVE AUTH DATA
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.user._id);
        localStorage.setItem('role', res.user.role);

        // ✅ ROLE BASED REDIRECT
        if (res.user.role === 'admin') {
          this.router.navigate(['/admin/add-room']);
        } else {
          this.router.navigate(['/user/rooms']);
        }

        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err.error?.msg || 'Login failed';
        this.loading = false;
      }
    });
  }
}