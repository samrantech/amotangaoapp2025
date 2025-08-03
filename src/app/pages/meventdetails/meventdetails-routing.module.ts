import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeventdetailsPage } from './meventdetails.page';

const routes: Routes = [
  {
    path: '',
    component: MeventdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeventdetailsPageRoutingModule {}
