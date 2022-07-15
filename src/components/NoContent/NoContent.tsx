import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';

type Props = {
  title: string;
  content: string;
};

const NoContent = (props: Props) => {
  const {title, content} = props;

  return (
    <View style={styles.noContent}>
      <MaterialIcons name="event-available" size={64} color={Colors.grey500} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

export default NoContent;

const styles = StyleSheet.create({
  content: {
    fontSize: 20,
    color: Colors.grey500,
    textAlign: 'center',
    marginHorizontal: 50,
    fontWeight: '500',
  },
  noContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    marginBottom: 10,
    color: Colors.grey500,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
