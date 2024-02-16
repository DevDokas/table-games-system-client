import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FateBasicComponent } from './fate-basic.component';

console.log('oioi')

const routes: Routes = [
  {
    path: ':slug',
    component: FateBasicComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FateBasicRoutingModule { }
