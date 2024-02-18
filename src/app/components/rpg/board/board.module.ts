import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { MatIconModule } from '@angular/material/icon';
import { BoardConfigurationsComponent } from './board-configurations/board-configurations.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BoardComponent,
    BoardConfigurationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
