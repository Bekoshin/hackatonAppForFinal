import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LineAwesomeIcon} from '../constants/LineAwesomeIconSet';
import {HomeScreen} from '../screens/home/HomeScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {IdeaStack} from './IdeaStack';

const Tab = createBottomTabNavigator();

export const TabStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        labelStyle: {fontFamily: 'Rubik-Medium'},
        showLabel: false,
      }}>
      <Tab.Screen
        name="All ideas"
        component={IdeaStack}
        options={{
          tabBarIcon: (param) => (
            <LineAwesomeIcon name="home" color={param.color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: (param) => (
            <LineAwesomeIcon name="cog" color={param.color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
