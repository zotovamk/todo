import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TodoRootComponent } from './todo-root.component';

@Component({ selector: 'app-todo' })
class MockAppTodoComponent {}

describe('TodoRootComponent', () => {
  let component: TodoRootComponent;
  let fixture: ComponentFixture<TodoRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoRootComponent, MockAppTodoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
