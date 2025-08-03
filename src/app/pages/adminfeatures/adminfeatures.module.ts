import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminfeaturesPageRoutingModule } from './adminfeatures-routing.module';

import { AdminfeaturesPage } from './adminfeatures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminfeaturesPageRoutingModule
  ],
  declarations: [AdminfeaturesPage]
})
export class AdminfeaturesPageModule {}
