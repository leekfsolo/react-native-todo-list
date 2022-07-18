import {TaskActionType, MODE} from './enum';

export interface DateTime {
  date: Date;
  time: Date;
}
export interface DateTimeAction {
  type: MODE;
  payload: DateTime;
}

export interface Task {
  title: string;
  date: Date;
  time: Date;
  isDone: boolean;
  id: string;
}

export interface TaskAction {
  type: TaskActionType;
  payload: Task;
  storage?: Array<Task>;
}
