import React, {Dispatch} from 'react';

import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Colors} from 'react-native-paper';
import {MODE} from '../../screens/reducer/enum';
import {CDate, DateTime, DateTimeAction} from '../../screens/reducer/model';

type Props = {
  date: CDate;
  mode: MODE;
  setShow: (show: boolean) => void;
  setDateTime: Dispatch<DateTimeAction>;
  dateTime: DateTime;
};

const CDateTimePicker = (props: Props) => {
  const {date, setDateTime, mode, setShow, dateTime} = props;

  const onChange = (event: DateTimePickerEvent, selectedValue?: Date) => {
    if (mode === MODE.DATE) {
      const currentDate = selectedValue || dateTime.date;
      setShow(false);
      setDateTime({
        type: MODE.DATE,
        payload: currentDate,
      });
    } else {
      const currentTime = selectedValue || dateTime.time;
      setShow(false);
      setDateTime({
        type: MODE.TIME,
        payload: currentTime,
      });
    }
  };

  return (
    <TouchableOpacity onPress={() => setShow(false)} style={styles.container}>
      <DateTimePicker
        value={date || new Date()}
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

  headerText: {color: Colors.amber100, fontSize: 18},
});

export default CDateTimePicker;
