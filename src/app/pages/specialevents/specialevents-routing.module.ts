import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialeventsPage } from './specialevents.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialeventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialeventsPageRoutingModule {}
