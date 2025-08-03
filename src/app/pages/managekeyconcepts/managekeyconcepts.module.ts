import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyaccountPageRoutingModule } from './managekeyconcepts-routing.module';
import { MyaccountPage } from './managekeyconcepts.page';
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
