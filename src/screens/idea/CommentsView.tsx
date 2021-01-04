import React, {useContext, useState} from 'react';
import {Comment} from '../../models/Comment';
import {AppContext} from '../../App';
import {FlatList, View} from 'react-native';
import {styles} from './styles';
import {MssButton} from '../../components/mssButton/MssButton';
import {CommentCard} from '../../components/commentCard/CommentCard';
import {InputModal} from '../../components/inputModal/InputModal';

type CommentsViewProps = {
  comments: Comment[];
  onAddComment: (message: string) => Promise<void>;
  onDeleteComment: (comment: Comment) => Promise<void>;
};

export const CommentView = (props: CommentsViewProps) => {
  const {comments, onAddComment, onDeleteComment} = props;

  const {profile} = useContext(AppContext);

  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const renderItem = ({item}: {item: Comment}) => {
    return (
      <CommentCard
        comment={item}
        onDeletePress={onDeleteComment}
        ownComment={item.user.id === profile?.id}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        contentContainerStyle={styles.flatListContentContainer}
        data={comments}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReachedThreshold={0.5}
      />
      <MssButton
        style={styles.button}
        label="Ответить"
        onPress={() => setCommentModalVisible(true)}
      />
      <InputModal
        label="Комментарий"
        value={''}
        visible={commentModalVisible}
        placeholder="Введите комментарий"
        onSwipeComplete={() => setCommentModalVisible(false)}
        onOkButtonPress={onAddComment}
        onBackdropPress={() => setCommentModalVisible(false)}
      />
    </View>
  );
};
