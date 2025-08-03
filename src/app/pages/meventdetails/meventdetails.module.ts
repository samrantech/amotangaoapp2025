import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeventdetailsPageRoutingModule } from './meventdetails-routing.module';

import { MeventdetailsPage } from './meventdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeventdetailsPageRoutingModule
  ],
  declarations: [MeventdetailsPage]
})
export class MeventdetailsPageModule {}
