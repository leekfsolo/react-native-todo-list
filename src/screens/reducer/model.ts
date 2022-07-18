import {TaskActionType, MODE} from './enum';

export type CDate = Date | null;

export interface DateTime {
  date: CDate;
  time: CDate;
}
export interface DateTimeAction {
  type: MODE;
  payload: CDate;
}

export interface Task {
  title: string;
  date: CDate;
  time: CDate;
  isDone: boolean;
  id: string;
}

export interface TaskAction {
  type: TaskActionType;
  payload: Task;
  storage?: Array<Task>;
}
