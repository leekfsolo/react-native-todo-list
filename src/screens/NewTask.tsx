import React, {useReducer, useState} from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {MainStackParamList} from '../routes';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DateTime, Task} from './reducer/model';
import CEvent from '../utils/CEvent';
import {dateTimeReducer} from './reducer';

const initDateTime: DateTime = {
  date: new Date(),
  time: '12:00',
};

type Props = NativeStackScreenProps<MainStackParamList, 'NewTask'>;

const NewTask = ({navigation}: Props) => {
  const [title, setTitle] = useState<string>('');
  const [dateTime, setDateTime] = useReducer(dateTimeReducer, initDateTime);

  const handleSubmit = async () => {
    const task: Task = {
      title,
    };

    try {
      const prevJsonTasks = await AsyncStorage.getItem('tasks');
      await AsyncStorage.clear();

      if (prevJsonTasks === null) {
        await AsyncStorage.setItem('tasks', JSON.stringify([task]));
      } else {
        const prevTasks = await AsyncStorage.getItem('tasks');
        if (prevTasks) {
          const currentTasks = [task, ...JSON.parse(prevTasks)];
          await AsyncStorage.setItem('tasks', JSON.stringify(currentTasks));
        }
      }
      CEvent.emit('addTask', task);
    } catch (e: any) {
      Alert.alert('Error', e.message, [{text: 'Ok'}]);
    }

    navigation.navigate('MyTasks');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Listing tasks to organize your work</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Enter your title"
            style={styles.titleInput}
            autoFocus
            maxLength={50}
            value={title}
            onChangeText={value => setTitle(value)}
          />
          <DateTimePicker value={new Date()} mode="date" display="default" />
          <Pressable
            onPress={handleSubmit}
            style={({pressed}) => [
              styles.button,
              {backgroundColor: pressed ? Colors.blue700 : Colors.blue500},
            ]}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewTask;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: RFValue(20),
  },
  container: {
    flex: 1,
    padding: 40,
  },
  form: {
    marginTop: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: RFValue(24),
    color: Colors.blue900,
    fontWeight: '700',
  },
  titleInput: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: RFValue(16),
    borderRadius: 5,
  },
  descriptionInput: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize: RFValue(16),
    borderRadius: 5,
  },
});
