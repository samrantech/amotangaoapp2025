import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventlistPageRoutingModule } from './tangotripslist-routing.module';

import { EventlistPage } from './tangotripslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventlistPageRoutingModule
  ],
  declarations: [EventlistPage]
})
export class TangotripslistPageModule {}
