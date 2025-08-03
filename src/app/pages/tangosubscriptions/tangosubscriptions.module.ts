import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TangosubscriptionsPageRoutingModule } from './tangosubscriptions-routing.module';

import { TangosubscriptionsPage } from './tangosubscriptions.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TangosubscriptionsPageRoutingModule
  ],
  declarations: [TangosubscriptionsPage]
})
export class TangosubscriptionsPageModule {}
