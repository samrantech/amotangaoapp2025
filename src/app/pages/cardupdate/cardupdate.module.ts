import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardupdatePageRoutingModule } from './cardupdate-routing.module';

import { CardupdatePage } from './cardupdate.page';
import { NgxStripeModule   } from 'ngx-stripe'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardupdatePageRoutingModule,
    ReactiveFormsModule,
    NgxStripeModule
  ],
  declarations: [CardupdatePage]
})
export class CardupdatePageModule {}
