import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PATHS } from '@models/constants';
import { TodoRootComponent } from '@views/todo/todo-root.component';

const routes: Routes = [
  { path: PATHS.TODO, component: TodoRootComponent },
  { path: PATHS.RPC, loadChildren: () => import('./views/rock-paper').then(m => m.RockPaperModule) },
  { path: '', redirectTo: PATHS.TODO, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
