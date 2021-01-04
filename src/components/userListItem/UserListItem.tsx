import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from './styles';
import {MssButton} from '../mssButton/MssButton';
import {COLORS} from '../../constants/colors';
import {User} from '../../models/User';

type UserListItemProps = {
  item: User;
  onPress: (item: User) => void;
  isSelected?: boolean;
};

export const UserListItem = (props: UserListItemProps) => {
  const {item, onPress, isSelected} = props;

  const handleItemPress = () => {
    onPress(item);
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <View style={styles.nameContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.name}>Имя</Text>
            <Text style={styles.value}>{item.name}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.name}>Должность</Text>
            <Text style={styles.value}>
              {item.position.name || 'Не указано'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.name}>Подразделение</Text>
            <Text style={styles.value}>
              {item.department.name || 'Не указано'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.name}>Образование</Text>
            <Text style={styles.value}>{item.education || 'Не указано'}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.name}>Год рождения</Text>
            <Text style={styles.value}>{item.birthday || 'Не указано'}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.name}>Стаж</Text>
            <Text style={styles.value}>{item.experience || 'Не указано'}</Text>
          </View>
        </View>
        <MssButton
          // disabled={isSelected}
          style={styles.button}
          height={34}
          label={isSelected ? 'Выбрано' : 'Выбрать'}
          onPress={handleItemPress}
          color={isSelected ? COLORS.SECONDARY_2 : COLORS.BACKGROUND_1}
          textColor={isSelected ? 'white' : COLORS.SECONDARY_DARK_1}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
