import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasubcriptionsPageRoutingModule } from './tasubcriptions-routing.module';

import { TasubcriptionsPage } from './tasubcriptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasubcriptionsPageRoutingModule
  ],
  declarations: [TasubcriptionsPage]
})
export class TasubcriptionsPageModule {}
