import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ITask } from 'src/app/models';
import { TasksService } from './services';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  tasks: ITask[] = [];
  newTask: { isImportant: boolean; isShown: boolean } = { isImportant: false, isShown: false };
  completedTasks: ITask[] = [];

  private destroy$ = new Subject();

  constructor(private readonly tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.setTasks();
    this.subscribeToTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addTask(title: string) {
    this.tasksService.addTask(title, this.newTask.isImportant);
    this.clearNewTask();
  }

  deleteTask(ind: number) {
    this.tasksService.deleteCurrent(ind);
  }

  deleteCompleted(ind: number) {
    this.tasksService.deleteCompleted(ind);
  }

  toggleTaskStatus(data: { ind: number; isChecked: boolean }) {
    data.isChecked ? this.tasksService.uncompleteTask(data.ind) : this.tasksService.completeTask(data.ind);
  }

  cancelAdding() {
    this.clearNewTask();
  }

  private subscribeToTasks() {
    this.tasksService.tasks$.pipe(takeUntil(this.destroy$)).subscribe(tasks => {
      this.tasks = tasks.current;
      this.completedTasks = tasks.completed;
    });
  }

  private clearNewTask() {
    this.newTask = { isImportant: false, isShown: false };
  }
}
