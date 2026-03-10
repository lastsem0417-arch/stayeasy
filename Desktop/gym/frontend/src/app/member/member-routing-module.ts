import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDashboard } from './member-dashboard/member-dashboard';
import { ViewPlans } from './view-plans/view-plans';
import { MyMembership } from './my-membership/my-membership';

const routes: Routes = [
  {
    path: '',
    component: MemberDashboard,
  },
  {
    path: 'plans',
    component: ViewPlans,
  },
  {
    path: 'membership',
    component: MyMembership,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
