import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DicesComponent } from './dices.component';
import { LottieComponent } from 'ngx-lottie';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DicesComponent
  ],
  imports: [
    CommonModule,
    LottieComponent,
    MatIconModule
  ],
  exports: [
    DicesComponent
  ]
})
export class DicesModule { }
