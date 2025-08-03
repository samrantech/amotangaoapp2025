import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeventsPageRoutingModule } from './mevents-routing.module';

import { MeventsPage } from './mevents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeventsPageRoutingModule
  ],
  declarations: [MeventsPage]
})
export class MeventsPageModule {}
