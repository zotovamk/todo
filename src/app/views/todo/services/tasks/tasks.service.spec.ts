import { TestBed } from '@angular/core/testing';
import { first, delay } from 'rxjs/operators';
import { defer, of } from 'rxjs';

import { TasksService } from './tasks.service';
import { TasksApiService } from '../tasks-api';

const TASKS_FROM_API = {
  current: [
    { id: 0, title: 'test', isImportant: true },
    { id: 2, title: 'aaand another one', isImportant: false },
  ],
  completed: [{ id: 1, title: 'another one', isImportant: false }],
};

class MockTasksApiService {
  updateTasks = () => {};
  getTasks = () => defer(() => of(TASKS_FROM_API));
}

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
      providers: [TasksService, { provide: TasksApiService, useClass: MockTasksApiService }],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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

  describe('[deleteTask]', () => {
    beforeEach(() => {
      const clone = JSON.parse(JSON.stringify(TASKS));
      (service as any).setTasks(clone);
      service.tasks$.pipe(delay(0), first()).subscribe();
    });

    it('should remove task with id: 1 from currents', (done: DoneFn) => {
      const currentResult = [{ id: 0, title: 'a', isImportant: true }];
      service.deleteTask(1, false);

      service.tasks$.pipe(delay(0), first()).subscribe(
        data => {
          expect(data.current).toEqual(currentResult);
          done();
        },
        _ => fail('should return data'),
      );
    });

    it('should remove task with id:2 from completed', (done: DoneFn) => {
      const completedResult = [{ id: 3, title: 'd', isImportant: false }];
      service.deleteTask(2, true);

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
      (service as any).setTasks(clone);
      service.tasks$.pipe(delay(0), first()).subscribe();
    });

    it('[completeTask] should replace elem with id:0 from current to completed', (done: DoneFn) => {
      service.completeTask(0);

      service.tasks$.pipe(delay(0), first()).subscribe(
        data => {
          expect(data).toEqual(completeResult);
          done();
        },
        _ => fail('should return data'),
      );
    });

    it('[uncompleteTask] should replace elem with id:3 from completed to current', (done: DoneFn) => {
      service.uncompleteTask(3);

      service.tasks$.pipe(delay(0), first()).subscribe(
        data => {
          expect(data).toEqual(uncompleteResult);
          done();
        },
        _ => fail('should return data'),
      );
    });
  });

  it('[setTasksFromApi] should set mock data from service', (done: DoneFn) => {
    service.setTasksFromApi();

    service.tasks$.pipe(delay(0), first()).subscribe(
      data => {
        expect(!!data.current.length).toBeTruthy();
        expect(data).toEqual(TASKS_FROM_API);
        done();
      },
      _ => fail('should set data'),
    );
  });

  it('[setTasks] should set mock data', (done: DoneFn) => {
    service.setTasks(TASKS);

    service.tasks$.pipe(delay(0), first()).subscribe(
      data => {
        expect(!!data.current.length).toBeTruthy();
        expect(data).toEqual(TASKS);
        done();
      },
      _ => fail('should set data'),
    );
  });
});
