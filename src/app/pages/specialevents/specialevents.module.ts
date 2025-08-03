import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialeventsPageRoutingModule } from './specialevents-routing.module';

import { SpecialeventsPage } from './specialevents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialeventsPageRoutingModule
  ],
  declarations: [SpecialeventsPage]
})
export class SpecialeventsPageModule {}
