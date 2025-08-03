import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceqrPage } from './attendanceqr.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceqrPageRoutingModule {}
