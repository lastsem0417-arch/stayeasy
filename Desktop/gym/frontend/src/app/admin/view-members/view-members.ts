import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plan, PlanModel } from '../../services/plan';
import { Membership } from '../../services/membership';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Member {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

@Component({
  selector: 'app-view-members',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-members.html',
  styleUrl: './view-members.scss',
})
export class ViewMembers implements OnInit {
  members: Member[] = [];
  loading = false;
  error: string | null = null;
  info: string | null = null;

  plans: PlanModel[] = [];
  selectedPlanByMember: { [userId: string]: string } = {};

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private planService: Plan,
    private membershipService: Membership
  ) {}

  ngOnInit() {
    this.fetchMembers();
    this.fetchPlans();
  }

  fetchMembers() {
    this.loading = true;
    this.error = null;
    this.http.get<Member[]>(`${this.apiUrl}/users`).subscribe({
      next: (members) => {
        this.members = members;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load members.';
        this.loading = false;
      },
    });
  }

  fetchPlans() {
    this.planService.getPlans().subscribe({
      next: (plans) => {
        this.plans = plans;
      },
      error: () => {
        // Plans not critical to show error here; rely on admin noticing empty list
      },
    });
  }

  changeSelectedPlan(userId: string, planId: string) {
    this.selectedPlanByMember[userId] = planId;
  }

  activate(member: Member) {
    this.error = null;
    this.info = null;
    const planId =
      this.selectedPlanByMember[member._id] || this.plans[0]?._id || '';

    if (!planId) {
      this.error = 'No plan available to activate.';
      return;
    }

    this.membershipService.activateMembership(member._id, planId).subscribe({
      next: (res) => {
        this.info = res.message || 'Membership activated successfully.';
      },
      error: (err) => {
        this.error =
          err?.error?.message ||
          'Failed to activate membership. Please try again.';
      },
    });
  }
}
