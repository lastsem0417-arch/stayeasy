import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
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
      name: ['', Validators.required],
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
    this.auth.register(this.form.value as any).subscribe({
      next: (res) => {
        this.auth.saveAuth(res);
        this.router.navigate(['/member']);
        this.loading = false;
      },
      error: (err) => {
        this.error =
          err?.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      },
    });
  }
}
