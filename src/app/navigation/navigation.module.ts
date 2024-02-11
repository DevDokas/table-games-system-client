import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NavigationRoutingModule } from './navigation-routing.module';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    MatIconModule,
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
