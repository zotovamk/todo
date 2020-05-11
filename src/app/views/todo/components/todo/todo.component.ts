import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ITask } from '@models/interfaces';
import { TasksService } from '../../services';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  @Input() withCompletedArr = true;

  tasks: ITask[] = [];
  newTask: { isImportant: boolean; isShown: boolean } = { isImportant: false, isShown: false };
  completedTasks: ITask[] = [];

  private destroy$ = new Subject();

  constructor(private readonly tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.setTasksFromApi();
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

  deleteTask(id: number, isCompleted: boolean) {
    this.tasksService.deleteTask(id, isCompleted);
  }

  toggleTaskStatus(data: { id: number; isChecked: boolean }) {
    data.isChecked ? this.tasksService.uncompleteTask(data.id) : this.tasksService.completeTask(data.id);
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
