import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { RockPaperComponent } from './rock-paper.component';
import { RockPaperRoutingModule } from './rock-paper-routing.module';

@NgModule({
  declarations: [RockPaperComponent],
  imports: [CommonModule, SharedModule, RockPaperRoutingModule],
})
export class RockPaperModule {}
