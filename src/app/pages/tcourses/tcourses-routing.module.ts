import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TcoursesPage } from './tcourses.page';

const routes: Routes = [
  {
    path: '',
    component: TcoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TcoursesPageRoutingModule {}
