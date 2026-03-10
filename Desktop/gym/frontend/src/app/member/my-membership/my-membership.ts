import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Membership, MembershipModel } from '../../services/membership';

@Component({
  selector: 'app-my-membership',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-membership.html',
  styleUrl: './my-membership.scss',
})
export class MyMembership implements OnInit {
  memberships: MembershipModel[] = [];
  loading = false;
  error: string | null = null;

  constructor(private membershipService: Membership) {}

  ngOnInit() {
    this.fetchMemberships();
  }

  fetchMemberships() {
    this.loading = true;
    this.error = null;
    this.membershipService.getMyMemberships().subscribe({
      next: (memberships) => {
        this.memberships = memberships;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load membership details.';
        this.loading = false;
      },
    });
  }

  getPlan(m: MembershipModel): any {
    return m.planId as any;
  }
}
