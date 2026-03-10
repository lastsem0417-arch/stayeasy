import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AddPlan } from './add-plan/add-plan';
import { ViewMembers } from './view-members/view-members';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboard,
  },
  {
    path: 'plans',
    component: AddPlan,
  },
  {
    path: 'members',
    component: ViewMembers,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
