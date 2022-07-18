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
import {formatDate, formatTime, generateRandomId} from '../utils/helper';

const initDateTime: DateTime = {
  date: null,
  time: null,
};

type Props = NativeStackScreenProps<MainStackParamList, 'NewTask'>;

const NewTask = ({navigation}: Props) => {
  const [title, setTitle] = useState<string>('');
  const [dateShow, setDateShow] = useState<boolean>(false);
  const [timeShow, setTimeShow] = useState<boolean>(false);
  const [dateTime, setDateTime] = useReducer(dateTimeReducer, initDateTime);

  const handleSubmit = async () => {
    const task: Task = {
      title,
      id: generateRandomId(),
      isDone: false,
      time: dateTime.time,
      date: dateTime.date,
    };

    if (title.length > 0 && dateTime.date && dateTime.time) {
      CEvent.emit('addTask', task);
      navigation.navigate('MyTasks');
    } else {
      Alert.alert('Error', 'Some of the inputs are not filled', [{text: 'Ok'}]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Listing tasks to organize your work</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Enter your title"
            style={styles.titleInput}
            maxLength={50}
            value={title}
            onChangeText={value => setTitle(value)}
          />
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              onPress={() => setDateShow(true)}
              style={[styles.selectDT, styles.selectDate]}>
              <Text style={styles.dateText}>
                {dateTime.date
                  ? `Date: ${formatDate(dateTime.date)}`
                  : 'Select due date'}
              </Text>
              {dateShow && (
                <CDateTimePicker
                  date={dateTime.date}
                  mode={MODE.DATE}
                  setShow={setDateShow}
                  setDateTime={setDateTime}
                  dateTime={dateTime}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTimeShow(true)}
              style={[styles.selectDT, styles.selectTime]}>
              <Text style={styles.dateText}>
                {dateTime.time
                  ? `Time: ${formatTime(dateTime.time)}`
                  : 'Select due time'}
              </Text>
              {timeShow && (
                <CDateTimePicker
                  date={dateTime.time}
                  mode={MODE.TIME}
                  setShow={setTimeShow}
                  setDateTime={setDateTime}
                  dateTime={dateTime}
                />
              )}
            </TouchableOpacity>
          </View>
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
  dateTimeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectDT: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  selectDate: {
    width: '48%',
  },
  selectTime: {
    width: '48%',
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
