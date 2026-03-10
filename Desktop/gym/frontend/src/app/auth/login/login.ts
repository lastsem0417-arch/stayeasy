import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loading = false;
  error: string | null = null;

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.auth.login(this.form.value as any).subscribe({
      next: (res) => {
        this.auth.saveAuth(res);
        const user = this.auth.getCurrentUser();
        if (user?.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/member']);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error =
          err?.error?.message || 'Login failed. Please check credentials.';
        this.loading = false;
      },
    });
  }
}
