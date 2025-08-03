import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminfeaturesPage } from './adminfeatures.page';

const routes: Routes = [
  {
    path: '',
    component: AdminfeaturesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminfeaturesPageRoutingModule {}
