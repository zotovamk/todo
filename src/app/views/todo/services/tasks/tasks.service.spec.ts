import { TestBed } from '@angular/core/testing';
import { first, delay } from 'rxjs/operators';

import { TasksService } from './tasks.service';

const TASKS = {
  current: [
    { id: 0, title: 'a', isImportant: true },
    { id: 1, title: 'b', isImportant: false },
  ],
  completed: [
    { id: 2, title: 'c', isImportant: true },
    { id: 3, title: 'd', isImportant: false },
  ],
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksService],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[setTasks] should set mock data', (done: DoneFn) => {
    service.setTasks();

    service.tasks$.pipe(delay(0), first()).subscribe(
      data => {
        expect(!!data.current.length).toBeTruthy();
        expect(data.completed.length).toBe(0);
        done();
      },
      _ => fail('should set data'),
    );
  });

  it('[addTask] should push new elem with data to current tasks', (done: DoneFn) => {
    service.addTask('test', true);

    service.tasks$.pipe(delay(0), first()).subscribe(
      data => {
        const last = data.current[data.current.length - 1];
        expect(last.title).toBe('test');
        expect(last.isImportant).toBeTruthy();
        done();
      },
      _ => fail('should set data'),
    );
  });

  describe('Delete', () => {
    beforeEach(() => {
      const clone = JSON.parse(JSON.stringify(TASKS));
      (service as any).updateTasks(clone);
      service.tasks$.pipe(delay(0), first()).subscribe();
    });

    it('[deleteCurrent] should remove second task from currents', (done: DoneFn) => {
      const currentResult = [{ id: 0, title: 'a', isImportant: true }];
      service.deleteCurrent(1);

      service.tasks$.pipe(delay(0), first()).subscribe(
        data => {
          expect(data.current).toEqual(currentResult);
          done();
        },
        _ => fail('should return data'),
      );
    });

    it('[deleteCompleted] should remove first task from completed', (done: DoneFn) => {
      const completedResult = [{ id: 3, title: 'd', isImportant: false }];
      service.deleteCompleted(0);

      service.tasks$.pipe(delay(0), first()).subscribe(
        data => {
          expect(data.completed).toEqual(completedResult);
          done();
        },
        _ => fail('should return data'),
      );
    });
  });

  describe('Check on complete / uncomplete', () => {
    const completeResult = {
      current: [{ id: 1, title: 'b', isImportant: false }],
      completed: [
        { id: 0, title: 'a', isImportant: true },
        { id: 2, title: 'c', isImportant: true },
        { id: 3, title: 'd', isImportant: false },
      ],
    };

    const uncompleteResult = {
      current: [
        { id: 0, title: 'a', isImportant: true },
        { id: 1, title: 'b', isImportant: false },
        { id: 3, title: 'd', isImportant: false },
      ],
      completed: [{ id: 2, title: 'c', isImportant: true }],
    };

    beforeEach(() => {
      const clone = JSON.parse(JSON.stringify(TASKS));
      (service as any).updateTasks(clone);
      service.tasks$.pipe(delay(0), first()).subscribe();
    });

    it('[completeTask] should replace first elem from current to completed', (done: DoneFn) => {
      service.completeTask(0);

      service.tasks$.pipe(delay(0), first()).subscribe(
        data => {
          expect(data).toEqual(completeResult);
          done();
        },
        _ => fail('should return data'),
      );
    });

    it('[uncompleteTask] should replace second elem from completed to current', (done: DoneFn) => {
      service.uncompleteTask(1);

      service.tasks$.pipe(delay(0), first()).subscribe(
        data => {
          expect(data).toEqual(uncompleteResult);
          done();
        },
        _ => fail('should return data'),
      );
    });
  });
});
