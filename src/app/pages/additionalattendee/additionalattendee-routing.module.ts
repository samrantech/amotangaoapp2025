import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalattendeePage } from './additionalattendee.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionalattendeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalattendeePageRoutingModule {}
