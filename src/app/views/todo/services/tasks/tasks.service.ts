import { Injectable } from '@angular/core';
import { ITask } from 'src/app/models';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ITasks {
  current: ITask[];
  completed: ITask[];
}

const MOCK_TASKS: ITask[] = [
  { id: 0, title: 'test', isImportant: true },
  { id: 1, title: 'another one', isImportant: false },
  { id: 2, title: 'aaand another one', isImportant: false },
];

@Injectable()
export class TasksService {
  private tasksObj$: BehaviorSubject<ITasks> = new BehaviorSubject({ current: [], completed: [] });

  constructor() {}

  get tasks$(): Observable<ITasks> {
    return this.tasksObj$.asObservable();
  }

  private get current(): ITask[] {
    return this.tasksObj$.getValue().current;
  }

  private get completed(): ITask[] {
    return this.tasksObj$.getValue().completed;
  }

  setTasks() {
    this.updateTasks({ current: MOCK_TASKS, completed: [] });
  }

  addTask(title: string, isImportant: boolean = false) {
    const current = this.current;
    const newTask = {
      id: Date.now(),
      title,
      isImportant,
    };

    current.push(newTask);
    this.updateTasks({ current });
  }

  deleteCurrent(ind: number) {
    const current = this.current;
    current.splice(ind, 1);

    this.updateTasks({ current });
  }

  deleteCompleted(ind: number) {
    const completed = this.completed;
    completed.splice(ind, 1);

    this.updateTasks({ completed });
  }

  completeTask(ind: number) {
    const tasksObj = this.tasksObj$.getValue();
    const task = this.current[ind];

    tasksObj.completed.unshift(task);
    tasksObj.current.splice(ind, 1);
    this.updateTasks(tasksObj);
  }

  uncompleteTask(ind: number) {
    const tasksObj = this.tasksObj$.getValue();
    const task = this.completed[ind];

    tasksObj.current.push(task);
    tasksObj.completed.splice(ind, 1);
    this.updateTasks(tasksObj);
  }

  private updateTasks(updated: { current?: ITask[]; completed?: ITask[] }) {
    this.tasksObj$.next({ ...this.tasksObj$.getValue(), ...updated });
  }
}
