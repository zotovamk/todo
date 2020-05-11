import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '@models/interfaces';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  @Input() tasks: ITask[] = [];
  @Input() isChecked = false;

  @Output() private deleteTaskById = new EventEmitter<number>();
  @Output() private checkTaskById = new EventEmitter<{ id: number; isChecked: boolean }>();

  constructor() {}

  deleteTask(id: number) {
    this.deleteTaskById.emit(id);
  }

  checkTask(id: number) {
    this.checkTaskById.emit({ id, isChecked: this.isChecked });
  }

  isCheckedT = (task: ITask) => (task.hasOwnProperty('isCompleted') ? task.isCompleted : this.isChecked);
  trackById = (_, task: ITask) => task.id;
}
