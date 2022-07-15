import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MyTasks from '../screens/MyTasks';
import DoneTasks from '../screens/DoneTasks';
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

export type RootStackParamList = {
  MyTasks: undefined;
  DoneTasks: undefined;
  AddTasks: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: Colors.blue700,
          tabBarInactiveTintColor: Colors.grey500,
          headerStyle: styles.header,
          headerTintColor: Colors.white,
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitle,
          tabBarStyle: {height: 70},
          tabBarItemStyle: {paddingVertical: 10},
          tabBarLabelStyle: {fontSize: RFValue(12)},
          tabBarIcon: ({focused, color}) => {
            if (route.name === 'AddTasks') {
              return null;
            }
            const icons = {
              MyTasks: 'assignment',
              DoneTasks: 'assignment-turned-in',
            };

            return (
              <MaterialIcons
                name={icons[route.name]}
                color={color}
                size={focused ? RFValue(30) : RFValue(25)}
              />
            );
          },
        })}
        initialRouteName="MyTasks">
        <Tab.Screen
          name="MyTasks"
          component={MyTasks}
          options={{title: 'My Tasks'}}
        />
        <Tab.Screen
          name="DoneTasks"
          component={DoneTasks}
          options={{title: 'Done Tasks'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.blue700,
  },
  headerTitle: {
    fontWeight: '700',
  },
});

export default Routes;
