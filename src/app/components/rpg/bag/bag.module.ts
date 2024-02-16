import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BagComponent } from './bag.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    BagComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
  ],
  exports: [
    BagComponent
  ]
})
export class BagModule { }
