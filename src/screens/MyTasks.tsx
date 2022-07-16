import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import CButton from '../components/CButton/CButton';
import NoContent from '../components/NoContent/NoContent';
import {MainStackParamList} from '../routes';
import {Task} from '../utils/model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CEvent from '../utils/CEvent';

type Props = NativeStackScreenProps<MainStackParamList>;

const MyTasks = ({navigation}: Props) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const handleNavigate = (screen: keyof MainStackParamList) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    const getTasks = async () => {
      const jsonData = await AsyncStorage.getItem('tasks');
      await AsyncStorage.clear();
      if (jsonData) {
        const data: Array<Task> = JSON.parse(jsonData);
        setTasks(data);
      }
    };

    getTasks();
  }, []);

  useEffect(() => {
    const handleAddTask = (task: Task) =>
      setTasks(prevTasks => {
        return [task, ...prevTasks];
      });
    CEvent.addListener('addTask', handleAddTask);

    return CEvent.addListener('addTask', handleAddTask).remove();
  }, []);

  return (
    <View style={styles.body}>
      {tasks.length > 0 ? (
        tasks.map((task, idx) => (
          <View key={idx}>
            <Text>{task.title}</Text>
            <Text>{task.description}</Text>
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
