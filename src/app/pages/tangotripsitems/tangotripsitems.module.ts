import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TangotripsitemsPageRoutingModule } from './tangotripsitems-routing.module';

import { TangotripsitemsPage } from './tangotripsitems.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TangotripsitemsPageRoutingModule
  ],
  declarations: [TangotripsitemsPage]
})
export class TangotripsitemsPageModule {}
