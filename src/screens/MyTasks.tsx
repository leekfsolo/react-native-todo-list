import React, {useEffect, useReducer} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import CButton from '../components/CButton';
import NoContent from '../components/NoContent';
import {MainStackParamList} from '../routes';
import {Task} from './reducer/model';
import CEvent from '../utils/CEvent';
import {taskReducer} from './reducer';
import {TaskActionType} from './reducer/enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {generateRandomId} from '../utils/helper';

const initTasks: Array<Task> = [];
type Props = NativeStackScreenProps<MainStackParamList>;

const MyTasks = ({navigation}: Props) => {
  const [tasks, setTasks] = useReducer(taskReducer, initTasks);

  const handleNavigate = (screen: keyof MainStackParamList) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    const getTasks = async () => {
      const jsonTasksValue = await AsyncStorage.getItem('tasks');
      await AsyncStorage.clear();
      if (jsonTasksValue) {
        setTasks({
          type: TaskActionType.GET,
          payload: {
            id: generateRandomId(),
            isDone: false,
            title: 'test',
            time: new Date(),
            date: new Date(),
          },
          storage: JSON.parse(jsonTasksValue),
        });
      }
    };

    getTasks();
  }, []);

  useEffect(() => {
    const handleAddTask = (task: Task) =>
      setTasks({type: TaskActionType.ADD, payload: task});
    CEvent.addListener('addTask', handleAddTask);

    return CEvent.addListener('addTask', handleAddTask).remove();
  }, []);

  return (
    <View style={styles.body}>
      {tasks.length > 0 ? (
        tasks.map((task, idx) => (
          <View key={idx}>
            <Text>{task.title}</Text>
          </View>
        ))
      ) : (
        <NoContent
          title="No tasks today"
          content="There's currently no tasks for you. Enjoy your day!!!"
        />
      )}

      <CButton handleNavigate={handleNavigate} />
    </View>
  );
};

export default MyTasks;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    position: 'relative',
  },
});
