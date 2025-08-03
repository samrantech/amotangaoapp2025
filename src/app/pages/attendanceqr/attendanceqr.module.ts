import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceqrPageRoutingModule } from './attendanceqr-routing.module';

import { AttendanceqrPage } from './attendanceqr.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QRCodeModule,
    IonicModule,
    AttendanceqrPageRoutingModule
  ],
  declarations: [AttendanceqrPage]
})
export class AttendanceqrPageModule {}
