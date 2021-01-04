import React, {useEffect, useState} from 'react';
import {MssModal} from '../mssModal/MssModal';
import {MssInput} from '../mssInput/MssInput';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../constants/colors';
import {MssButton} from '../mssButton/MssButton';
import {IdeaCost} from '../../models/IdeaCost';

type CostModalProps = {
  index: number | undefined;
  cost: IdeaCost | undefined;
  visible: boolean;
  onSwipeComplete: () => void;
  onOkButtonPress: (cost: IdeaCost, index?: number) => void;
  onBackdropPress?: () => void;
};

export const CostModal = (props: CostModalProps) => {
  const {
    index,
    cost,
    visible,
    onBackdropPress,
    onOkButtonPress,
    onSwipeComplete,
  } = props;

  const [name, setName] = useState(cost?.name || '');
  const [amount, setAmount] = useState(cost?.amount.toString() || '0');

  useEffect(() => {
    if (visible) {
      setName(cost?.name || '');
      setAmount(cost?.amount.toString() || '0');
    }
  }, [cost, visible]);

  const handleOkButtonPress = () => {
    onOkButtonPress(
      {
        id: cost?.id,
        name: name,
        amount: parseFloat(amount),
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
        <Text style={styles.inputLabel}>Сумма</Text>
        <MssInput
          placeholder="Введите сумму"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          onClearButtonPress={() => setAmount('0')}
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
