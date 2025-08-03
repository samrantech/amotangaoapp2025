import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TangoeventsPage } from './tangoevents.page';

const routes: Routes = [
  {
    path: '',
    component: TangoeventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TangoeventsPageRoutingModule {}
