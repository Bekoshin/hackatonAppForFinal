import React from 'react';
import {Comment} from '../../models/Comment';
import {SwipeableComponent} from '../swipeableComponent/SwipeableComponent';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../constants/colors';
import moment from 'moment';

type CommentCardProps = {
  comment: Comment;
  onDeletePress: (comment: Comment) => Promise<void>;
  ownComment: boolean;
};

export const CommentCard = (props: CommentCardProps) => {
  const {comment, ownComment, onDeletePress} = props;

  const handleDeletePress = async () => {
    await onDeletePress(comment);
  };

  return (
    <SwipeableComponent
      style={styles.mainContainer}
      onRightButtonPress={handleDeletePress}
      disabledSwipe={!ownComment}>
      <View
        style={[
          styles.contentContainer,
          {
            backgroundColor: ownComment
              ? COLORS.SECONDARY_2 + 'BB'
              : COLORS.PRIMARY + 'BB',
          },
        ]}>
        <View style={styles.commentContainer}>
          <Text style={styles.sender}>
            {ownComment ? 'Вы' : comment.user.name}
          </Text>
          <Text style={styles.date}>
            {moment(comment.createdAt).format('LLL')}
          </Text>
        </View>
        <Text style={styles.message}>{comment.message}</Text>
      </View>
    </SwipeableComponent>
  );
};
