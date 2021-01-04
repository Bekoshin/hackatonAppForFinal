import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './styles';
import {Expert} from '../../models/Expert';
import {endpoints} from '../../constants/endpoints';

const AVATAR_WIDTH = 100;

type ExpertCardProps = {
  expert: Expert;
};

export const ExpertCard = (props: ExpertCardProps) => {
  const {expert} = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}>
          <Image
            resizeMode={'cover'}
            style={[
              {
                borderRadius: AVATAR_WIDTH / 2,
                width: AVATAR_WIDTH,
                height: AVATAR_WIDTH,
              },
            ]}
            width={AVATAR_WIDTH}
            height={AVATAR_WIDTH}
            source={{uri: endpoints.baseForPhoto + expert.user.avatar}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{expert.user.name}</Text>
            <Text style={styles.message}>
              {expert.approve === null
                ? 'Не проголосовал'
                : expert.approve
                ? 'Проголосовал за'
                : 'Проголосовал против'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
