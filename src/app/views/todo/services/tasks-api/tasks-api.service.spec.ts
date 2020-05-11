import { TestBed } from '@angular/core/testing';
import { delay, first } from 'rxjs/operators';

import { ITasks } from '@models/interfaces';
import { TasksApiService } from './tasks-api.service';

const MOCK_TASKS: ITasks = {
  current: [
    { id: 0, title: 'test', isImportant: true },
    { id: 1, title: 'another one', isImportant: false },
    { id: 2, title: 'aaand another one', isImportant: false },
  ],
  completed: [{ id: 3, title: 'done', isImportant: true }],
};

const UPDATED_TASKS = {
  current: [{ id: 0, title: 'test', isImportant: true }],
  completed: [],
};

describe('TasksApiService', () => {
  let service: TasksApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksApiService],
    });
    service = TestBed.inject(TasksApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('[updateTasks] should return updated tasks obj', done => {
    service
      .getTasks()
      .pipe(first())
      .subscribe(data => {
        expect(data).toEqual(MOCK_TASKS);
      });

    service.updateTasks(UPDATED_TASKS);

    service
      .getTasks()
      .pipe(delay(0), first())
      .subscribe(
        data => {
          expect(data).toEqual(UPDATED_TASKS);
          done();
        },
        _ => fail('should return data'),
      );
  });
});
