import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MysubscriptionsPageRoutingModule } from './mysubscriptions-routing.module';

import { MysubscriptionsPage } from './mysubscriptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MysubscriptionsPageRoutingModule
  ],
  declarations: [MysubscriptionsPage]
})
export class MysubscriptionsPageModule {}
