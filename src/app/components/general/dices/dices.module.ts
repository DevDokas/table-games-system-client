import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DicesComponent } from './dices.component';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  declarations: [
    DicesComponent
  ],
  imports: [
    CommonModule,
    LottieComponent
  ],
  exports: [
    DicesComponent
  ]
})
export class DicesModule { }
