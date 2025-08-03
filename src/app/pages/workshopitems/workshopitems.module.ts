import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkshopitemsPageRoutingModule } from './workshopitems-routing.module';

import { WorkshopitemsPage } from './workshopitems.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkshopitemsPageRoutingModule
  ],
  declarations: [WorkshopitemsPage]
})
export class WorkshopitemsPageModule {}
