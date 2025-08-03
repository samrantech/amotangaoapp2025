import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationviewPage } from './notificationview.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationviewPageRoutingModule {}
