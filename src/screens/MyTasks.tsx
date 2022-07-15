import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CButton from '../components/CButton/CButton';
import NoContent from '../components/NoContent/NoContent';
import {Task} from '../utils/model';

const MyTasks = () => {
  const [tasks, setTasks] = useState<Array<Task>>([]);

  return (
    <View style={styles.body}>
      {tasks.length > 0 ? (
        tasks.map((task, idx) => (
          <View key={idx}>
            <Text>{task.name}</Text>
          </View>
        ))
      ) : (
        <NoContent
          title="No tasks today"
          content="There's currently no tasks for you. Enjoy your day!!!"
        />
      )}

      <CButton />
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
