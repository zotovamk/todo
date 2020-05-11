import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ITasks } from '@models/interfaces';

const MOCK_TASKS: ITasks = {
  current: [
    { id: 0, title: 'test', isImportant: true },
    { id: 1, title: 'another one', isImportant: false },
    { id: 2, title: 'aaand another one', isImportant: false },
  ],
  completed: [{ id: 3, title: 'done', isImportant: true }],
};

@Injectable({
  providedIn: 'root'
})
export class TasksApiService {
  // tslint:disable-next-line:variable-name
  private _tasks$: BehaviorSubject<ITasks> = new BehaviorSubject(MOCK_TASKS);

  constructor() { }

  getTasks(): Observable<ITasks> {
    return this._tasks$.asObservable();
  }

  updateTasks(tasks: ITasks) {
    this._tasks$.next(tasks);
  }
}
