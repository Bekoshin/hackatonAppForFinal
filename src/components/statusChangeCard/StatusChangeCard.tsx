import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import moment from 'moment';
import {StatusChange} from '../../models/StatusChange';
import {getStatus} from '../../utils/IdeaStatusUtils';

type StatusChangeCardProps = {
  statusChange: StatusChange;
};

export const StatusChangeCard = (props: StatusChangeCardProps) => {
  const {statusChange} = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6}}>
          <View style={{flex: 0.5}}>
            <Text style={styles.sender}>{statusChange.user.name}</Text>
          </View>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <Text style={styles.date}>
              {moment(statusChange.createdAt).format('LLL')}
            </Text>
          </View>
        </View>
        <Text style={styles.message}>{`Переведено на статус ${getStatus(
          statusChange.status,
        )}`}</Text>
      </View>
    </View>
  );
};
