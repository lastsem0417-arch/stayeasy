import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface PlanModel {
  _id?: string;
  name: string;
  duration: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class Plan {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPlans() {
    return this.http.get<PlanModel[]>(`${this.apiUrl}/plans`);
  }

  createPlan(plan: PlanModel) {
    return this.http.post<{ message: string; plan: PlanModel }>(
      `${this.apiUrl}/plans`,
      plan
    );
  }
}
