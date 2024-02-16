import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { GamesListComponent } from '../pages/games-list/games-list.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('../pages/games-list/games-list.module').then(m => m.GamesListModule)
      },
      {
        path: 'game',
        loadChildren: () => import('../pages/game-menu/game-menu.module').then(m => m.GameMenuModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../pages/register/register.module').then(m => m.RegisterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
