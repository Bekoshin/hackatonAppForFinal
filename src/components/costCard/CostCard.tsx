import React from 'react';
import {IdeaCost} from '../../models/IdeaCost';
import {SwipeableComponent} from '../swipeableComponent/SwipeableComponent';
import {Text, TouchableHighlight, View} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../constants/colors';

type CostCardProps = {
  index: number;
  cost: IdeaCost;
  onDeletePress: (cost: IdeaCost, index: number) => void;
  onPress: (cost: IdeaCost, index: number) => void;
};

export const CostCard = (props: CostCardProps) => {
  const {cost, onDeletePress, onPress, index} = props;

  const handleDeletePress = () => {
    onDeletePress(cost, index);
  };
  const handlePress = () => {
    onPress(cost, index);
  };

  return (
    <SwipeableComponent
      style={styles.mainContainer}
      onRightButtonPress={handleDeletePress}>
      <TouchableHighlight
        onPress={handlePress}
        activeOpacity={0.9}
        underlayColor={COLORS.SECONDARY_DARK_1}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{cost.name}</Text>
          <Text style={styles.text}>{cost.amount}</Text>
        </View>
      </TouchableHighlight>
    </SwipeableComponent>
  );
};
