import React, {Context, createContext, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {COLORS} from './constants/colors';
import {RootStack} from './stacks/RootStack';
import * as moment from 'moment';
import 'moment/locale/ru';
import {User} from './models/User';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.BACKGROUND_2,
    card: 'white',
  },
};

export const AppContext: Context<{
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
  hasToken: boolean;
  setHasToken: (hasToken: boolean) => void;
  profile: User | undefined;
  setProfile: (profile: User | undefined) => void;
}> = createContext<{
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
  hasToken: boolean;
  setHasToken: (hasToken: boolean) => void;
  profile: User | undefined;
  setProfile: (profile: User | undefined) => void;
}>({
  initialized: false,
  setInitialized: () => {},
  hasToken: false,
  setHasToken: () => {},
  profile: undefined,
  setProfile: () => {},
});

const App = () => {
  moment.locale('ru');
  const [initialized, setInitialized] = useState<boolean>(false);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [profile, setProfile] = useState<User | undefined>();

  const contextValue = {
    initialized: initialized,
    setInitialized: setInitialized,
    hasToken: hasToken,
    setHasToken: setHasToken,
    profile: profile,
    setProfile: setProfile,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <NavigationContainer theme={Theme}>
        <RootStack />
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
