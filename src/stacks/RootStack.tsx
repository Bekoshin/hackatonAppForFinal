import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {SplashScreen} from '../screens/splash/SplashScreen';
import {TYPOGRAPHY} from '../constants/typography';
import {AuthScreen} from '../screens/auth/AuthScreen';
import {TabStack} from './TabStack';
import {AppContext} from '../App';

export type RootStackParamList = {
  Tab: undefined;
  Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const {initialized, hasToken} = useContext(AppContext);

  if (!initialized) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTitleStyle: TYPOGRAPHY.HEADER_4,
        headerTitle: () => null,
        headerLeft: () => null,
        headerShown: false,
      }}>
      {hasToken ? (
        <Stack.Screen name="Tab" component={TabStack} />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{header: () => null}}
        />
      )}
    </Stack.Navigator>
  );
};
