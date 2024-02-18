import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FateBasicComponent } from './fate-basic.component';
import { FateBasicRoutingModule } from './fate-basic-routing.module';
import { DicesModule } from '../../../components/general/dices/dices.module';
import { BoardModule } from '../../../components/rpg/board/board.module';

console.log('oioi')

@NgModule({
  declarations: [
    FateBasicComponent
  ],
  imports: [
    CommonModule,
    FateBasicRoutingModule,
    DicesModule,
    BoardModule,
  ],
  exports: [
    FateBasicComponent,
  ]
})
export class FateBasicModule { }
