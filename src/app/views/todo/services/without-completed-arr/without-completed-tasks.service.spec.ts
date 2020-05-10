import { TestBed } from '@angular/core/testing';
import { first, delay } from 'rxjs/operators';

import { WithoutCompletedTasksService } from './without-completed-tasks.service';

const MOCK_TASKS = {
  current: [
    { id: 0, title: 'test', isImportant: true },
    { id: 1, title: 'another one', isImportant: false },
    { id: 2, title: 'aaand another one', isImportant: false },
  ],
  completed: [
    { id: 3, title: 'done', isImportant: true },
    { id: 4, title: 'done', isImportant: false },
  ],
};

const MOCK_TRANSFORMED = {
  current: [
    { id: 0, title: 'test', isImportant: true, isCompleted: false },
    { id: 1, title: 'another one', isImportant: false, isCompleted: false },
    { id: 2, title: 'aaand another one', isImportant: false, isCompleted: false },
    { id: 3, title: 'done', isImportant: true, isCompleted: true },
    { id: 4, title: 'done', isImportant: false, isCompleted: true },
  ],
  completed: [],
};

describe('WithoutCompletedTasksService', () => {
  let service: WithoutCompletedTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WithoutCompletedTasksService],
    });
    service = TestBed.inject(WithoutCompletedTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('[setTasks]', () => {
    it('should set tasks with new transformed data', done => {
      service.setTasks(MOCK_TASKS);

      service.tasks$.pipe(delay(0), first()).subscribe(
        data => {
          expect(data).toEqual(MOCK_TRANSFORMED);
          done();
        },
        _ => 'should return some data',
      );
    });

    it('should set _completedIdsSet with ids of completed tasks', () => {
      const result = new Set([3, 4]);

      service.setTasks(MOCK_TASKS);

      expect((service as any)._completedIdsSet).toEqual(result);
    });
  });
});
