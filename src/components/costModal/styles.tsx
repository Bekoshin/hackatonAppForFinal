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
  inputLabel: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.SECONDARY_DARK_1,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
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
