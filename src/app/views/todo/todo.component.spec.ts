import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { defer, of } from 'rxjs';

import { TodoComponent } from './todo.component';
import { ITasks, TasksService } from './services';

let tasks: ITasks = {
  current: [
    { id: 0, title: 'test', isImportant: true },
    { id: 2, title: 'aaand another one', isImportant: false },
  ],
  completed: [{ id: 1, title: 'another one', isImportant: false }],
};

class MockTasksService {
  tasks$ = defer(() => of(tasks));
  setTasks() {}
  addTask() {}
  deleteCurrent() {}
  deleteCompleted() {}
  completeTask() {}
  uncompleteTask() {}
}

@Component({ selector: 'app-tasks-list' })
class MockAppTasksComponent {
  @Input() tasks;
}

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent, MockAppTasksComponent],
      providers: [{ provide: TasksService, useClass: MockTasksService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data from mock to current and completed', () => {
    expect(component.tasks).toEqual(tasks.current);
    expect(component.completedTasks).toEqual(tasks.completed);
  });

  it('[addTask] should call tasksService.addTask', () => {
    (component as any).tasksService.addTask = jasmine.createSpy();
    component.newTask = { isImportant: true, isShown: true };

    component.addTask('test');

    expect((component as any).tasksService.addTask).toHaveBeenCalledWith('test', true);
    expect(component.newTask).toEqual({ isImportant: false, isShown: false });
  });

  describe('[toggleTaskStatus]', () => {
    it('should call completeTasks for checked current task', () => {
      (component as any).tasksService.completeTask = jasmine.createSpy();

      component.toggleTaskStatus({ ind: 1, isChecked: false });

      expect((component as any).tasksService.completeTask).toHaveBeenCalledWith(1);
    });

    it('should call uncompleteTasks for unchecked completed task', () => {
      (component as any).tasksService.uncompleteTask = jasmine.createSpy();

      component.toggleTaskStatus({ ind: 0, isChecked: true });

      expect((component as any).tasksService.uncompleteTask).toHaveBeenCalledWith(0);
    });
  });
});
