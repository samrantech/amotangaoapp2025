import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkshoplistPage } from './workshoplist.page';

const routes: Routes = [
  {
    path: '',
    component: WorkshoplistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshoplistPageRoutingModule {}
