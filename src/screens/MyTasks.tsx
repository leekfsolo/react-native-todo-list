import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MyTasks = () => {
  return (
    <View style={styles.body}>
      <Text>MyTasks</Text>
    </View>
  );
};

export default MyTasks;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
