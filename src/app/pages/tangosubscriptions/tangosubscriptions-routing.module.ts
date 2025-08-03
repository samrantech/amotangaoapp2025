import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TangosubscriptionsPage } from './tangosubscriptions.page';

const routes: Routes = [
  {
    path: '',
    component: TangosubscriptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TangosubscriptionsPageRoutingModule {}
