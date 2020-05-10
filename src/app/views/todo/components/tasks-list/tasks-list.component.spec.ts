import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListComponent } from './tasks-list.component';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[deleteTask] should emit deleteTaskById with 0 as id', () => {
    (component as any).deleteTaskById.emit = jasmine.createSpy();
    component.deleteTask(0);

    expect((component as any).deleteTaskById.emit).toHaveBeenCalledWith(0);
  });

  it('[checkTask] should emit deleteTaskById with 1 as id and isChecked as false', () => {
    component.isChecked = true;
    (component as any).checkTaskById.emit = jasmine.createSpy();

    component.checkTask(1);

    expect((component as any).checkTaskById.emit).toHaveBeenCalledWith({ id: 1, isChecked: true });
  });
});
