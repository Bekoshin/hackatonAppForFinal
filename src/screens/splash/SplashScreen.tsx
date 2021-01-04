import React, {useContext, useEffect} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {getTokenFromKeychain} from '../../utils/JwtTokenUtils';
import {styles} from './styles';
import {AppContext} from '../../App';

export const SplashScreen = () => {
  const {setInitialized, setHasToken} = useContext(AppContext);

  useEffect(() => {
    const initData = async () => {
      let jwtToken = await getTokenFromKeychain();
      setHasToken(!!jwtToken);
      setInitialized(true);
    };
    initData().catch((error) => console.log('init data error: ', error));
  }, [setHasToken, setInitialized]);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeAreaView}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/logo.jpg')}
          resizeMode="contain"
        />
        <Text>SPLASH</Text>
      </SafeAreaView>
    </View>
  );
};
