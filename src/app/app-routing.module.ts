import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PATHS } from '@models/constants';
import { TodoRootComponent } from '@views/todo/todo-root.component';

const routes: Routes = [
  { path: PATHS.TODO, component: TodoRootComponent },
  { path: '', redirectTo: PATHS.TODO, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
