import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../constants/colors';

export const LoadingIndicator = () => {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator size="large" color={COLORS.PRIMARY} />
    </View>
  );
};
