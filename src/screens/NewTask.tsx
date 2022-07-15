import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MainStackParamList} from '../routes';

type Props = NativeStackScreenProps<MainStackParamList>;

const NewTask = ({navigation, route}: Props) => {
  return (
    <View>
      <Text>NewTask</Text>
    </View>
  );
};

export default NewTask;

const styles = StyleSheet.create({});
