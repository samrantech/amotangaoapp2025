import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationviewPageRoutingModule } from './notificationview-routing.module';

import { NotificationviewPage } from './notificationview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationviewPageRoutingModule
  ],
  declarations: [NotificationviewPage]
})
export class NotificationviewPageModule {}
