import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesListComponent } from './games-list.component';
import { GamesListRoutingModule} from './games-list-routing.module';
import { CardModule } from '../../components/general/card/card.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GamesListComponent
  ],
  imports: [
    CommonModule,
    GamesListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    MatDialogModule,
  ],
  exports: [
    GamesListComponent
  ]
})
export class GamesListModule { }
