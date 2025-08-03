import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourselistPageRoutingModule } from './courselist-routing.module';

import { CourselistPage } from './courselist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourselistPageRoutingModule
  ],
  declarations: [CourselistPage]
})
export class CourselistPageModule {}
