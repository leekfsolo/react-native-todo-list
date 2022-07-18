import React, {Dispatch} from 'react';

import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Colors} from 'react-native-paper';
import {MODE} from '../../screens/reducer/enum';
import {DateTime, DateTimeAction} from '../../screens/reducer/model';

type Props = {
  date: Date;
  mode: MODE;
  setMode: (mode: MODE) => void;
  setShow: (show: boolean) => void;
  setDateTime: Dispatch<DateTimeAction>;
  setIsDateTouched: (isDateTouched: boolean) => void;
  dateTime: DateTime;
};

const CDateTimePicker = (props: Props) => {
  const {
    date,
    setDateTime,
    mode,
    setMode,
    setShow,
    dateTime,
    setIsDateTouched,
  } = props;

  const onChange = (event: DateTimePickerEvent, selectedValue?: Date) => {
    setShow(Platform.OS === 'ios');
    setIsDateTouched(true);
    if (mode === MODE.DATE) {
      const currentDate = selectedValue || dateTime.date;
      setDateTime({
        type: MODE.DATE,
        payload: {date: new Date(currentDate), time: dateTime.time},
      });
      setMode(MODE.TIME);
      setShow(Platform.OS !== 'ios');
    } else {
      const currentTime = selectedValue || dateTime.time;
      setDateTime({
        type: MODE.TIME,
        payload: {time: currentTime, date: dateTime.date},
      });
      setMode(MODE.DATE);
      setShow(Platform.OS === 'ios');
    }
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <TouchableOpacity onPress={() => onClose()} style={styles.container}>
      {Platform.OS === 'ios' && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onClose()}>
            <Text style={styles.headerText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
      <DateTimePicker
        value={date}
        mode={mode}
        display="default"
        onChange={onChange}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Platform.OS === 'ios' ? '#00000066' : 'transparent',
    position: 'absolute',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    padding: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.grey200,
  },
  headerText: {color: Colors.amber100, fontSize: 18},
});

export default CDateTimePicker;
