import React from 'react';
import {MssModal} from '../mssModal/MssModal';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../constants/colors';
import {MssButton} from '../mssButton/MssButton';
import {LoadingIndicator} from '../loadingIndicator/LoadingIndicator';

type DialogModalProps = {
  text: string;
  visible: boolean;
  onCancelPress: () => void;
  onOkPress: () => void;
  onBackdropPress?: () => void;
  loading?: boolean;
};

export const DialogModal = (props: DialogModalProps) => {
  const {
    text,
    visible,
    onCancelPress,
    onOkPress,
    onBackdropPress,
    loading,
  } = props;

  return (
    <MssModal
      style={styles.modal}
      scrollTo={() => {}}
      scrollOffset={undefined}
      visible={visible}
      avoidKeyboard={true}
      onSwipeComplete={onCancelPress}
      onBackdropPress={onBackdropPress}>
      <View style={styles.mainContainer}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}

        <View style={styles.buttonContainer}>
          <MssButton
            style={styles.cancelButton}
            color={COLORS.BACKGROUND_1}
            textColor={COLORS.SECONDARY_DARK_1}
            label="Отмена"
            onPress={onCancelPress}
          />
          <MssButton
            disabled={loading}
            color={loading ? COLORS.BACKGROUND_1 : COLORS.PRIMARY}
            textColor={loading ? COLORS.SECONDARY_DARK_1 : 'white'}
            style={styles.okButton}
            label="Ок"
            onPress={onOkPress}
          />
        </View>
      </View>
    </MssModal>
  );
};
