import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Plan, PlanModel } from '../../services/plan';

@Component({
  selector: 'app-add-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-plan.html',
  styleUrl: './add-plan.scss',
})
export class AddPlan {
  loading = false;
  message: string | null = null;
  error: string | null = null;

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private planService: Plan) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      duration: ['1 month', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  submit() {
    this.error = null;
    this.message = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.planService.createPlan(this.form.value as PlanModel).subscribe({
      next: (res) => {
        this.message = res.message;
        this.loading = false;
        this.form.reset({ duration: '1 month', price: 0 });
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to create plan.';
        this.loading = false;
      },
    });
  }
}
