import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RpcActionDirective } from './directives';
import { ToolbarComponent } from './components';

@NgModule({
  declarations: [RpcActionDirective, ToolbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [RpcActionDirective, ToolbarComponent],
})
export class SharedModule {}
