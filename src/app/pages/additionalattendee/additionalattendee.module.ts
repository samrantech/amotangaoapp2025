import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalattendeePageRoutingModule } from './additionalattendee-routing.module';

import { AdditionalattendeePage } from './additionalattendee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionalattendeePageRoutingModule
  ],
  declarations: [AdditionalattendeePage]
})
export class AdditionalattendeePageModule {}
