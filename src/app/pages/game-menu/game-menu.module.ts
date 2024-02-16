import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMenuComponent } from './game-menu.component';
import { GameMenuRoutingModule } from './game-menu-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service';


@NgModule({
  declarations: [
    GameMenuComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GameMenuRoutingModule,
    MatIconModule,
    MatTabsModule,
  ],
  providers: [WebsocketService],
  exports: [GameMenuComponent]
})
export class GameMenuModule { }
