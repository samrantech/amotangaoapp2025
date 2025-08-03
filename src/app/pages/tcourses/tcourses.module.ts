import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TcoursesPageRoutingModule } from './tcourses-routing.module';

import { TcoursesPage } from './tcourses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TcoursesPageRoutingModule
  ],
  declarations: [TcoursesPage]
})
export class TcoursesPageModule {}
