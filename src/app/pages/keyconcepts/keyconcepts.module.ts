import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyaccountPageRoutingModule } from './keyconcepts-routing.module';
import { MyaccountPage } from './keyconcepts.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QRCodeModule,
    IonicModule,
    MyaccountPageRoutingModule
  ],
  declarations: [MyaccountPage]
})
export class PartnersearchPageModule {}
