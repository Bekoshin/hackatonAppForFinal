import {StyleSheet} from 'react-native';
import {TYPOGRAPHY} from '../../constants/typography';
import {COLORS} from '../../constants/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    paddingLeft: 13,
    paddingRight: 11,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flex: 0.7,
  },
  name: {
    ...(TYPOGRAPHY.HEADER_5 as Object),
    color: COLORS.PRIMARY_DARK,
  },
  address: {
    ...(TYPOGRAPHY.TEXT_LINK as Object),
    color: COLORS.SECONDARY_DARK_1,
    marginTop: 4,
  },
  buttonContainer: {
    flex: 0.3,
  },
  button: {
    width: 100,
    height: 34,
    alignSelf: 'flex-end',
  },
});
