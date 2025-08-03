import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklyschedulePage } from './weeklyschedule.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklyschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyschedulePageRoutingModule {}
