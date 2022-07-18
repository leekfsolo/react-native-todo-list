import React, {useReducer, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {MainStackParamList} from '../routes';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from 'react-native-paper';
import {DateTime, Task} from './reducer/model';
import CEvent from '../utils/CEvent';
import {dateTimeReducer} from './reducer';
import CDateTimePicker from '../components/CDateTimePicker';
import {MODE} from './reducer/enum';
import {formatDate, generateRandomId} from '../utils/helper';

const initDateTime: DateTime = {
  date: new Date(),
  time: new Date(),
};

type Props = NativeStackScreenProps<MainStackParamList, 'NewTask'>;

const NewTask = ({navigation}: Props) => {
  const [title, setTitle] = useState<string>('');
  const [isDateTouched, setIsDateTouched] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [mode, setMode] = useState<MODE>(MODE.DATE);
  const [dateTime, setDateTime] = useReducer(dateTimeReducer, initDateTime);

  const handleSubmit = async () => {
    const task: Task = {
      title,
      id: generateRandomId(),
      isDone: false,
      time: dateTime.time,
      date: dateTime.date,
    };

    try {
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
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={styles.selectDate}>
            <Text style={styles.dateText}>
              {isDateTouched ? formatDate(dateTime) : 'Select due date'}
            </Text>
            {show && (
              <CDateTimePicker
                date={dateTime.date}
                mode={mode}
                setMode={setMode}
                setShow={setShow}
                setDateTime={setDateTime}
                dateTime={dateTime}
                setIsDateTouched={setIsDateTouched}
              />
            )}
          </TouchableOpacity>
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
    textAlign: 'center',
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
  selectDate: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  titleInput: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    fontSize: RFValue(16),
    borderRadius: 5,
  },
  dateText: {
    fontSize: RFValue(16),
  },
});
