import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurclassesPageRoutingModule } from './ourclasses-routing.module';

import { OurclassesPage } from './ourclasses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurclassesPageRoutingModule
  ],
  declarations: [OurclassesPage]
})
export class OurclassesPageModule {}
