import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoComponent } from './todo.component';
import { TasksService } from './services';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';

@NgModule({
  declarations: [TodoComponent, TasksListComponent],
  imports: [CommonModule],
  providers: [TasksService],
})
export class TodoModule {}
