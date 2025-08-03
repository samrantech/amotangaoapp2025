import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubcriptionlistPageRoutingModule } from './subcriptionlist-routing.module';
import { SubcriptionlistPage } from './subcriptionlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubcriptionlistPageRoutingModule,    
  ],
  declarations: [SubcriptionlistPage]
})
export class SubcriptionlistPageModule {}
