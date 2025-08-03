import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TangotripsitemsPage } from './tangotripsitems.page';

const routes: Routes = [
  {
    path: '',
    component: TangotripsitemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TangotripsitemsPageRoutingModule {}
