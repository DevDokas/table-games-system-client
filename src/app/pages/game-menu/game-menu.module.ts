import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMenuComponent } from './game-menu.component';
import { GameMenuRoutingModule } from './game-menu-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GameMenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GameMenuRoutingModule,
    MatTabsModule,
  ],
  exports: [GameMenuComponent]
})
export class GameMenuModule { }
