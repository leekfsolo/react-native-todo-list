import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MainStackParamList} from '../../routes';

type Props = {
  handleNavigate: (screen: keyof MainStackParamList) => void;
};

const CButton = (props: Props) => {
  const {handleNavigate} = props;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleNavigate('NewTask')}>
      <MaterialIcons name="add" size={32} color={Colors.white} />
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: Colors.blue500,
    borderRadius: 50,
    padding: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
  },
});
