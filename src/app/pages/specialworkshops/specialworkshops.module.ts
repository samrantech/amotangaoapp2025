import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialworkshopsPageRoutingModule } from './specialworkshops-routing.module';

import { SpecialworkshopsPage } from './specialworkshops.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialworkshopsPageRoutingModule
  ],
  declarations: [SpecialworkshopsPage]
})
export class SpecialworkshopsPageModule {}
