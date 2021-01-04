import React from 'react';
import {Category} from '../../models/Category';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../constants/colors';
import {MssButton} from '../mssButton/MssButton';

type CategoryListItemProps = {
  item: Category;
  onPress: (item: Category) => void;
  isSelected?: boolean;
};

export const CategoryListItem = (props: CategoryListItemProps) => {
  const {item, onPress, isSelected} = props;

  const handleItemPress = () => {
    onPress(item);
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <MssButton
            style={styles.button}
            height={34}
            label={isSelected ? 'Выбрано' : 'Выбрать'}
            onPress={handleItemPress}
            color={isSelected ? COLORS.SECONDARY_2 : COLORS.BACKGROUND_1}
            textColor={isSelected ? 'white' : COLORS.SECONDARY_DARK_1}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
