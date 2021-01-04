import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TYPOGRAPHY} from '../constants/typography';
import {HomeScreen} from '../screens/home/HomeScreen';
import {IdeaController} from '../screens/idea/IdeaController';
import {LogsScreen} from '../screens/logs/LogsScreen';
import {StatusChange} from '../models/StatusChange';
import {Expert} from '../models/Expert';
import {ExpertsScreen} from '../screens/experts/ExpertsScreen';

export type IdeaStackParamList = {
  List: undefined;
  Idea: {ideaId?: number};
  Logs: {statusChanges: StatusChange[]};
  Experts: {experts: Expert[]};
};

const NavigationIdea = createStackNavigator<IdeaStackParamList>();
export const IdeaStack = () => (
  <NavigationIdea.Navigator
    screenOptions={{
      headerTitleStyle: TYPOGRAPHY.HEADER_4,
      headerTitle: () => null,
      headerLeft: () => null,
    }}>
    <NavigationIdea.Screen
      name="List"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <NavigationIdea.Screen name="Idea" component={IdeaController} />
    <NavigationIdea.Screen name="Logs" component={LogsScreen} />
    <NavigationIdea.Screen name="Experts" component={ExpertsScreen} />
  </NavigationIdea.Navigator>
);
