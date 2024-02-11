import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameMenuComponent } from './game-menu.component';

const routes: Routes = [
  {
    path: ':id',
    component: GameMenuComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameMenuRoutingModule { }
