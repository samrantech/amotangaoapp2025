import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialworkshopsPage } from './specialworkshops.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialworkshopsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialworkshopsPageRoutingModule {}
