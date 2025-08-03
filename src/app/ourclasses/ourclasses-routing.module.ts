import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurclassesPage } from './ourclasses.page';

const routes: Routes = [
  {
    path: '',
    component: OurclassesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurclassesPageRoutingModule {}
