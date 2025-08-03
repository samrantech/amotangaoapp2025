import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TangoeventsPageRoutingModule } from './tangoevents-routing.module';

import { TangoeventsPage } from './tangoevents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TangoeventsPageRoutingModule
  ],
  declarations: [TangoeventsPage]
})
export class TangoeventsPageModule {}
