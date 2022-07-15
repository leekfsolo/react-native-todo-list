import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import CButton from '../components/CButton/CButton';
import NoContent from '../components/NoContent/NoContent';
import {MainStackParamList} from '../routes';
import {Task} from '../utils/model';

type Props = NativeStackScreenProps<MainStackParamList>;

const MyTasks = ({navigation}: Props) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const handleNavigate = (screen: keyof MainStackParamList) => {
    navigation.navigate(screen);
  };

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
