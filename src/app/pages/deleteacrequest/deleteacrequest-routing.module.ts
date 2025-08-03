import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteacrequestPage } from './deleteacrequest.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteacrequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteacrequestPageRoutingModule {}
