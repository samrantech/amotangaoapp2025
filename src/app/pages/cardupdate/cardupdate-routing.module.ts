import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardupdatePage } from './cardupdate.page';

const routes: Routes = [
  {
    path: '',
    component: CardupdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardupdatePageRoutingModule {}
