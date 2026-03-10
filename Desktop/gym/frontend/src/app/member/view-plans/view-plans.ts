import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plan, PlanModel } from '../../services/plan';
import { Membership } from '../../services/membership';

@Component({
  selector: 'app-view-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-plans.html',
  styleUrl: './view-plans.scss',
})
export class ViewPlans implements OnInit {
  plans: PlanModel[] = [];
  loading = false;
  error: string | null = null;
  message: string | null = null;

  constructor(
    private planService: Plan,
    private membershipService: Membership
  ) {}

  ngOnInit() {
    this.fetchPlans();
  }

  fetchPlans() {
    this.loading = true;
    this.error = null;
    this.planService.getPlans().subscribe({
      next: (plans) => {
        this.plans = plans;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load plans.';
        this.loading = false;
      },
    });
  }

  join(plan: PlanModel) {
    if (!plan._id) return;
    this.message = null;
    this.error = null;
    this.membershipService.joinPlan(plan._id).subscribe({
      next: (res) => {
        this.message = res.message;
      },
      error: (err) => {
        this.error =
          err?.error?.message || 'Failed to join plan. Please try again.';
      },
    });
  }
}
