import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NavigationRoutingModule } from './navigation-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { BagModule } from '../components/rpg/bag/bag.module';
import { SkillsModule } from '../components/rpg/skills/skills.module';
import { FichasDePersonagensModule } from './fichas-de-personagens/fichas-de-personagens.module';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationRoutingModule,
    CdkDrag,
    BagModule,
    SkillsModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    FichasDePersonagensModule,
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
