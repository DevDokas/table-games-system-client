import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
  ],
  exports: [
    SkillsComponent
  ]
})
export class SkillsModule { }
