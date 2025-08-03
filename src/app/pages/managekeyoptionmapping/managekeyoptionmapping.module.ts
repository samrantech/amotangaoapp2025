import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyaccountPageRoutingModule } from './managekeyoptionmapping-routing.module';
import { MyaccountPage } from './managekeyoptionmapping.page';
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
