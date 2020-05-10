import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITask, ITasks, ParamOfITasks } from '@models/interfaces';
import { TasksApiService } from '../tasks-api';

@Injectable()
export class TasksService {
  private tasksObj$: BehaviorSubject<ITasks> = new BehaviorSubject({ current: [], completed: [] });

  get tasks$(): Observable<ITasks> {
    return this.tasksObj$.asObservable();
  }

  get tasks(): ITasks {
    return this.tasksObj$.getValue();
  }

  private get current(): ITask[] {
    return this.tasks.current;
  }

  private get completed(): ITask[] {
    return this.tasks.completed;
  }

  constructor(protected tasksApiService: TasksApiService) {}

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

  deleteTask(id: number, isCompleted: boolean) {
    const param = isCompleted ? ParamOfITasks.Completed : ParamOfITasks.Current;
    const tasksList = this[param];
    const ind = this.getIndById(id, param);

    tasksList.splice(ind, 1);
    this.updateTasks({ [param]: tasksList });
  }

  completeTask(id: number) {
    const tasksObj = this.tasks;
    const ind = this.getIndById(id, ParamOfITasks.Current);
    const task = this.current[ind];

    tasksObj.completed.unshift(task);
    tasksObj.current.splice(ind, 1);
    this.updateTasks(tasksObj);
  }

  uncompleteTask(id: number) {
    const tasksObj = this.tasks;
    const ind = this.getIndById(id, ParamOfITasks.Completed);
    const task = this.completed[ind];

    tasksObj.current.push(task);
    tasksObj.completed.splice(ind, 1);
    this.updateTasks(tasksObj);
  }

  updateTasks(updated: { current?: ITask[]; completed?: ITask[] }) {
    const updatedTasks = { ...this.tasks, ...updated };
    this.tasksApiService.updateTasks(updatedTasks);
  }

  setTasksFromApi() {
    this.tasksApiService.getTasks().subscribe(tasks => {
      this.setTasks(tasks);
    });
  }

  setTasks(tasks: ITasks) {
    this.tasksObj$.next(tasks);
  }

  private getIndById(id: number, param: ParamOfITasks) {
    return this.tasks[param].findIndex(t => t.id === id);
  }
}
