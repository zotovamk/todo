import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RockPaperComponent } from './rock-paper.component';
import { RockPaperRoutingModule } from './rock-paper-routing.module';

@NgModule({
  declarations: [RockPaperComponent],
  imports: [CommonModule, RockPaperRoutingModule],
})
export class RockPaperModule {}
