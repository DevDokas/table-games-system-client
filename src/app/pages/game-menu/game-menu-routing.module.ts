import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameMenuComponent } from './game-menu.component';

const routes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: GameMenuComponent,
      },
      {
        path: 'fate-basic',
        loadChildren: () => import('../games/fate-basic/fate-basic.module').then(m => m.FateBasicModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameMenuRoutingModule { }
