import React from 'react';
import {Idea} from '../../models/Idea';
import {Text, TouchableOpacity, View} from 'react-native';
import {LineAwesomeIcon} from '../../constants/LineAwesomeIconSet';
import {COLORS} from '../../constants/colors';
import {styles} from './styles';
import {SwipeableCard} from '../swipeableCard/SwipeableCard';
import {getStatus} from '../../utils/IdeaStatusUtils';
import moment from 'moment';

type IdeaCardProps = {
  idea: Idea;
  onPress: (idea: Idea) => void;
  onDeletePress: (idea: Idea) => Promise<void>;
  onLikePress: (idea: Idea) => Promise<void>;
  ownIdea: boolean;
};

export const IdeaCard = (props: IdeaCardProps) => {
  const {idea, onPress, onDeletePress, onLikePress, ownIdea} = props;

  const handlePress = () => {
    onPress(idea);
  };

  const handleDeletePress = async () => {
    await onDeletePress(idea);
  };

  const handleLikePress = async () => {
    await onLikePress(idea);
  };

  return (
    <SwipeableCard
      progressBarColor={ownIdea ? COLORS.PRIMARY : undefined}
      style={{marginBottom: 10}}
      onRightButtonPress={handleDeletePress}
      onPress={handlePress}
      disabledSwipe={!ownIdea}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
        }}>
        <Text style={styles.name}>{`№ ${idea.id}`}</Text>
        <Text style={styles.status}>
          {moment(idea.createdAt).format('LLL')}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <View style={{flex: 0.7}}>
          <Text style={styles.name}>{idea.name}</Text>
        </View>
        <View style={{flex: 0.3, alignItems: 'flex-end'}}>
          <Text style={styles.status}>{getStatus(idea.status)}</Text>
        </View>
      </View>
      <View style={{marginVertical: 6}}>
        <Text style={styles.info}>{idea.info}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{marginRight: 4}} onPress={handleLikePress}>
          <LineAwesomeIcon
            name="heart"
            size={22}
            color={
              idea.likeAvailable ? COLORS.SECONDARY_DARK_2 : COLORS.SECONDARY_3
            }
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.countOfLikes,
            {
              color: idea.likeAvailable
                ? COLORS.PRIMARY_DARK
                : COLORS.SECONDARY_3,
            },
          ]}>
          {idea.countOfLikes}
        </Text>
        <LineAwesomeIcon
          style={{marginLeft: 16, marginRight: 4}}
          name="file"
          size={22}
          color={COLORS.SECONDARY_DARK_2}
        />
        <Text style={styles.countOfLikes}>{idea.countOfFiles || 0}</Text>
        <LineAwesomeIcon
          style={{marginLeft: 16, marginRight: 4}}
          name="note"
          size={22}
          color={COLORS.SECONDARY_DARK_2}
        />
        <Text style={styles.countOfLikes}>{idea.countOfComments || 0}</Text>
      </View>
    </SwipeableCard>
  );
};
