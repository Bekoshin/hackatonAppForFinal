import React from 'react';
import {IdeaStage} from '../../models/IdeaStage';
import {SwipeableComponent} from '../swipeableComponent/SwipeableComponent';
import {Text, TouchableHighlight, View} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../constants/colors';

type StageCardProps = {
  index: number;
  stage: IdeaStage;
  onDeletePress: (stage: IdeaStage, index: number) => void;
  onPress: (stage: IdeaStage, index: number) => void;
};

export const StageCard = (props: StageCardProps) => {
  const {index, stage, onDeletePress, onPress} = props;

  const handleDeletePress = () => {
    onDeletePress(stage, index);
  };

  const handlePress = () => {
    onPress(stage, index);
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
          <Text style={styles.text}>{stage.name}</Text>
          <Text style={styles.text}>{stage.countDays}</Text>
        </View>
      </TouchableHighlight>
    </SwipeableComponent>
  );
};
