import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutuserPageRoutingModule } from './checkoutuser-routing.module';

import { CheckoutuserPage } from './checkoutuser.page';
import { NgxStripeModule   } from 'ngx-stripe'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutuserPageRoutingModule,
    ReactiveFormsModule,
    NgxStripeModule
  ],
  declarations: [CheckoutuserPage]
})
export class CheckoutuserPageModule {}
