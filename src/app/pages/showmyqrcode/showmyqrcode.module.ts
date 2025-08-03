import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowmyqrcodePageRoutingModule } from './showmyqrcode-routing.module';

import { ShowmyqrcodePage } from './showmyqrcode.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QRCodeModule,
    IonicModule,
    ShowmyqrcodePageRoutingModule
  ],
  declarations: [ShowmyqrcodePage]
})
export class ShowmyqrcodePageModule {}
