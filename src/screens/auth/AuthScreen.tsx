import React, {useContext, useState} from 'react';
import {Alert, Platform, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {MssInput} from '../../components/mssInput/MssInput';
import {COLORS} from '../../constants/colors';
import {MssButton} from '../../components/mssButton/MssButton';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {TYPOGRAPHY} from '../../constants/typography';
import {AuthService} from '../../services/AuthService';
import {setTokenToKeychain} from '../../utils/JwtTokenUtils';
import {AppContext} from '../../App';

export const AuthScreen = () => {
  const {setHasToken} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const clearUsername = () => {
    setUsername('');
  };
  const clearPassword = () => {
    setPassword('');
  };

  const allFieldsFilled = () => {
    return !!(username && password);
  };

  const signIn = async () => {
    try {
      setLoading(true);
      const authService = new AuthService();
      const jwtToken = await authService.signIn(username, password);
      await setTokenToKeychain(username, jwtToken);
      setHasToken(true);
    } catch (error) {
      console.log('SIGN IN ERROR: ', error);
      if (error.name === 'Authentication error') {
        Alert.alert('Неверное имя пользователя или пароль');
      } else {
        Alert.alert('Не удалось авторизоваться');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.authContainer}>
          <View style={styles.headerContainer}>
            <Text style={TYPOGRAPHY.HEADER_3}>Войдите в свой аккаунт</Text>
          </View>
          <MssInput
            style={styles.input}
            placeholder="Логин"
            value={username}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={setUsername}
            onClearButtonPress={clearUsername}
            color={COLORS.BACKGROUND_2}
          />
          <MssInput
            style={styles.input}
            placeholder="Пароль"
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            onClearButtonPress={clearPassword}
            color={COLORS.BACKGROUND_2}
          />
          <MssButton
            style={styles.button}
            label="Войти"
            onPress={signIn}
            color={
              !allFieldsFilled() || loading
                ? COLORS.BACKGROUND_1
                : COLORS.PRIMARY
            }
            disabled={!allFieldsFilled() || loading}
          />
        </View>
        {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
      </SafeAreaView>
    </View>
  );
};
