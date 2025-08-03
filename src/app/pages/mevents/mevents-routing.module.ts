import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeventsPage } from './mevents.page';

const routes: Routes = [
  {
    path: '',
    component: MeventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeventsPageRoutingModule {}
