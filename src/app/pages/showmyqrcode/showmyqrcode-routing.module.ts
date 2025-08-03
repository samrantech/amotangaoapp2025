import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowmyqrcodePage } from './showmyqrcode.page';

const routes: Routes = [
  {
    path: '',
    component: ShowmyqrcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowmyqrcodePageRoutingModule {}
