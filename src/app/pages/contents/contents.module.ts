import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentsPageRoutingModule } from './contents-routing.module';

import { ContentsPage } from './contents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentsPageRoutingModule
  ],
  declarations: [ContentsPage]
})
export class ContentsPageModule {}
