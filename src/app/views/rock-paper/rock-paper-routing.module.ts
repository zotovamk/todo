import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RockPaperComponent } from './rock-paper.component';

const routes: Routes = [{ path: '', component: RockPaperComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class RockPaperRoutingModule {}
