import {StyleSheet} from 'react-native';
import {TYPOGRAPHY} from '../../constants/typography';
import {COLORS} from '../../constants/colors';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  modal: {
    backgroundColor: COLORS.BACKGROUND_2,
  },
  text: {
    ...(TYPOGRAPHY.HEADER_4 as Object),
    color: COLORS.PRIMARY_DARK,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 12,
    ...ifIphoneX(
      {
        marginBottom: 34,
      },
      {
        marginBottom: 0,
      },
    ),
  },
  cancelButton: {
    flex: 1,
    marginRight: 6,
  },
  okButton: {
    flex: 1,
    marginLeft: 6,
  },
});
