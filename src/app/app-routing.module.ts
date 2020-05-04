import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './views';
import { PATHS } from './models/constants';

const routes: Routes = [
  { path: PATHS.TODO, component: TodoComponent },
  { path: '', redirectTo: PATHS.TODO, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
