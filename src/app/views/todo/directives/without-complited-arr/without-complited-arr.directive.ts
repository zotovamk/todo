import { Directive } from '@angular/core';
import { TasksService, WithoutCompletedTasksService } from '../../services';

@Directive({
  selector: '[appWithoutComplitedArr]',
  providers: [{ provide: TasksService, useClass: WithoutCompletedTasksService }],
})
export class WithoutComplitedArrDirective {
  constructor() {}
}
