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

  it('[deleteTask] should emit deleteTaskByInd with 0 as ind', () => {
    (component as any).deleteTaskByInd.emit = jasmine.createSpy();
    component.deleteTask(0);

    expect((component as any).deleteTaskByInd.emit).toHaveBeenCalledWith(0);
  });

  it('[checkTask] should emit deleteTaskByInd with 1 as ind and isChecked as false', () => {
    component.isChecked = true;
    (component as any).checkTaskByInd.emit = jasmine.createSpy();

    component.checkTask(1);

    expect((component as any).checkTaskByInd.emit).toHaveBeenCalledWith({ ind: 1, isChecked: true });
  });
});
