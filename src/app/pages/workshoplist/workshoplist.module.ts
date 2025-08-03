import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkshoplistPageRoutingModule } from './workshoplist-routing.module';

import { WorkshoplistPage } from './workshoplist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkshoplistPageRoutingModule
  ],
  declarations: [WorkshoplistPage]
})
export class WorkshoplistPageModule {}
