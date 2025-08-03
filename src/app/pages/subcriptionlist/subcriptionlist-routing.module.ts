import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubcriptionlistPage } from './subcriptionlist.page';

const routes: Routes = [
  {
    path: '',
    component: SubcriptionlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubcriptionlistPageRoutingModule {}
