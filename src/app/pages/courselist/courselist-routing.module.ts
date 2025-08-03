import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourselistPage } from './courselist.page';

const routes: Routes = [
  {
    path: '',
    component: CourselistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourselistPageRoutingModule {}
