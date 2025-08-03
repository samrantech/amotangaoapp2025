import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteacrequestPageRoutingModule } from './deleteacrequest-routing.module';

import { DeleteacrequestPage } from './deleteacrequest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteacrequestPageRoutingModule
  ],
  declarations: [DeleteacrequestPage]
})
export class DeleteacrequestPageModule {}
