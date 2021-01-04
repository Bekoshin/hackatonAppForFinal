import React, {useEffect, useState} from 'react';
import {MssModal} from '../mssModal/MssModal';
import {MssInput} from '../mssInput/MssInput';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../constants/colors';
import {MssButton} from '../mssButton/MssButton';
import {IdeaStage} from '../../models/IdeaStage';

type StageModalProps = {
  index: number | undefined;
  stage: IdeaStage | undefined;
  visible: boolean;
  onSwipeComplete: () => void;
  onOkButtonPress: (stage: IdeaStage, index?: number) => void;
  onBackdropPress?: () => void;
};

export const StageModal = (props: StageModalProps) => {
  const {
    index,
    stage,
    visible,
    onBackdropPress,
    onOkButtonPress,
    onSwipeComplete,
  } = props;

  const [name, setName] = useState(stage?.name || '');
  const [days, setDays] = useState(stage?.countDays.toString() || '0');

  useEffect(() => {
    if (visible) {
      setName(stage?.name || '');
      setDays(stage?.countDays.toString() || '0');
    }
  }, [stage, visible]);

  const handleOkButtonPress = () => {
    onOkButtonPress(
      {
        id: stage?.id,
        name: name,
        countDays: parseFloat(days),
      },
      index,
    );
    onSwipeComplete();
  };

  return (
    <MssModal
      style={styles.modal}
      scrollTo={() => {}}
      scrollOffset={undefined}
      visible={visible}
      avoidKeyboard={true}
      onSwipeComplete={onSwipeComplete}
      onBackdropPress={onBackdropPress}>
      <View style={styles.mainContainer}>
        <Text style={styles.inputLabel}>Название</Text>
        <MssInput
          placeholder="Введите название"
          value={name}
          onChangeText={setName}
          onClearButtonPress={() => setName('')}
        />
        <Text style={styles.inputLabel}>Срок</Text>
        <MssInput
          placeholder="Введите количество дней"
          value={days}
          onChangeText={setDays}
          keyboardType="numeric"
          onClearButtonPress={() => setDays('0')}
        />
        <View style={styles.buttonContainer}>
          <MssButton
            style={styles.cancelButton}
            color={COLORS.BACKGROUND_1}
            textColor={COLORS.SECONDARY_DARK_1}
            label="Отмена"
            onPress={onSwipeComplete}
          />
          <MssButton
            style={styles.okButton}
            label="Ок"
            onPress={handleOkButtonPress}
          />
        </View>
      </View>
    </MssModal>
  );
};
