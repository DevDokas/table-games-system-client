import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMenuComponent } from './game-menu.component';
import { GameMenuRoutingModule } from './game-menu-routing.module';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    GameMenuComponent,
  ],
  imports: [
    CommonModule,
    GameMenuRoutingModule,
    MatTabsModule,
  ],
  exports: [GameMenuComponent]
})
export class GameMenuModule { }
