import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {LoadingIndicator} from '../loadingIndicator/LoadingIndicator';

export const LoadingView = () => {
  return (
    <View style={styles.mainContainer}>
      <LoadingIndicator />
    </View>
  );
};
