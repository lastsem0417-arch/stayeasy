import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PlanModel } from './plan';

export interface MembershipModel {
  _id?: string;
  userId: string;
  planId: PlanModel | string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired';
}

@Injectable({
  providedIn: 'root',
})
export class Membership {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  joinPlan(planId: string) {
    return this.http.post<{ message: string; membership: MembershipModel }>(
      `${this.apiUrl}/membership/join`,
      { planId }
    );
  }

  getMyMemberships() {
    return this.http.get<MembershipModel[]>(`${this.apiUrl}/membership/my`);
  }

  // Admin: manually activate membership for a user and plan
  activateMembership(userId: string, planId: string, startDate?: string) {
    const body: any = { userId, planId };
    if (startDate) {
      body.startDate = startDate;
    }
    return this.http.post<{ message: string; membership: MembershipModel }>(
      `${this.apiUrl}/membership/activate`,
      body
    );
  }
}
