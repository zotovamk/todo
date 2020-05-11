import { ITask } from '.';

export interface ITasks {
  current: ITask[];
  completed: ITask[];
}

export enum ParamOfITasks {
  Current = 'current',
  Completed = 'completed',
}
