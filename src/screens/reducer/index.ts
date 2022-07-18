import AsyncStorage from '@react-native-async-storage/async-storage';
import {MODE, TaskActionType} from './enum';
import {TaskAction, DateTime, DateTimeAction, Task} from './model';

export const dateTimeReducer = (state: DateTime, action: DateTimeAction) => {
  const {type, payload} = action;
  const {date, time} = payload;

  switch (type) {
    case MODE.DATE:
      return {...state, date};

    case MODE.TIME:
      return {...state, time};
  }
};

export const addTaskReducer = async (
  state: Array<Task>,
  action: TaskAction,
) => {
  const {type, payload, storage = []} = action;
  const {id} = payload;

  switch (type) {
    case TaskActionType.GET:
      return storage;

    case TaskActionType.ADD:
      const addTasks = [...state, payload];
      await AsyncStorage.setItem('tasks', JSON.stringify(addTasks));
      return addTasks;

    case TaskActionType.DELETE:
      const deleteTasks = state.filter(task => task.id !== id);
      await AsyncStorage.setItem('tasks', JSON.stringify(deleteTasks));
      return deleteTasks;

    case TaskActionType.TOGGLE:
      const toggleTasks = state.map(task => {
        if (task.id === id) {
          task.isDone = !task.isDone;
        }
        return task;
      });
      await AsyncStorage.setItem('tasks', JSON.stringify(toggleTasks));
      return toggleTasks;

    case TaskActionType.DELETECOMPLETED:
      const deleteCompletedTasks = state.filter(task => !task.isDone);
      await AsyncStorage.setItem('tasks', JSON.stringify(deleteCompletedTasks));
      return deleteCompletedTasks;
  }
};

export const initDateTime: DateTime = {
  date: new Date(),
  time: '12:00',
};
