import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ITask, ITasks } from '@models/interfaces';
import { TasksService } from '../tasks';
import { TasksApiService } from '../tasks-api';

@Injectable()
export class WithoutCompletedTasksService extends TasksService {
  /* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
  private _tasks$: BehaviorSubject<ITasks> = new BehaviorSubject({ current: [], completed: [] });
  private _completedIdsSet: Set<number> = new Set();

  get tasks$(): Observable<ITasks> {
    return this._tasks$.asObservable();
  }

  constructor(tasksApiService: TasksApiService) {
    super(tasksApiService);
  }

  completeTask(id: number) {
    this._completedIdsSet.has(id) ? super.uncompleteTask(id) : super.completeTask(id);
  }

  setTasks(tasks: ITasks) {
    const transformed = this.getTransformedTasks(tasks);
    this._tasks$.next({ ...transformed, completed: [] });
    this.setCompletedIdsSet(tasks.completed);
    super.setTasks(tasks);
  }

  private getTransformedTasks(updated: { current?: ITask[]; completed?: ITask[] }) {
    const completedT = updated.completed ? this.getArrWithIsComplt(updated.completed, true) : [];
    const currentT = updated.current ? this.getArrWithIsComplt(updated.current, false) : [];

    return { current: [...currentT, ...completedT] };
  }

  private setCompletedIdsSet(completed: ITask[]) {
    this._completedIdsSet = new Set(completed.map(t => t.id));
  }

  private getArrWithIsComplt(arr: ITask[], isCompleted: boolean): ITask[] {
    return arr.map(task => ({ ...task, isCompleted }));
  }
}
