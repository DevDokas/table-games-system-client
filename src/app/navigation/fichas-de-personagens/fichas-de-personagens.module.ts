import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichasDePersonagensComponent } from './fichas-de-personagens.component';
import { EditFichaFateBasicComponent } from './edit-ficha-fate-basic/edit-ficha-fate-basic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    FichasDePersonagensComponent,
    EditFichaFateBasicComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class FichasDePersonagensModule { }
