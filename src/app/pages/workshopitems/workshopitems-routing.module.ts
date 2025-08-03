import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkshopitemsPage } from './workshopitems.page';

const routes: Routes = [
  {
    path: '',
    component: WorkshopitemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshopitemsPageRoutingModule {}
