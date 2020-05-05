import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ITask } from 'src/app/models';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  @Input() tasks: ITask[] = [];
  @Input() isChecked = false;

  @Output() private deleteTaskByInd = new EventEmitter<number>();
  @Output() private checkTaskByInd = new EventEmitter<{ ind: number; isChecked: boolean }>();

  constructor() {}

  deleteTask(ind: number) {
    this.deleteTaskByInd.emit(ind);
  }

  checkTask(ind: number) {
    this.checkTaskByInd.emit({ ind, isChecked: this.isChecked });
  }

  trackById = (_, task: ITask) => task.id;
}
