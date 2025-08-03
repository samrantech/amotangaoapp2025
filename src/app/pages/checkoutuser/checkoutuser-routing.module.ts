import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutuserPage } from './checkoutuser.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutuserPageRoutingModule {}
