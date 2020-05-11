import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksService } from './services';
import { WithoutComplitedArrDirective } from './directives';
import { TodoComponent, TasksListComponent } from './components';
import { TodoRootComponent } from './todo-root.component';

@NgModule({
  declarations: [TodoRootComponent, TodoComponent, TasksListComponent, WithoutComplitedArrDirective],
  imports: [CommonModule],
  providers: [TasksService],
})
export class TodoModule {}
